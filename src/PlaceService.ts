import fs from "fs"
import { writeFile } from "@javarome/fileutil"
import { Elevation, Place } from "./Place"
import { PlaceLocation } from "./location"

export abstract class PlaceService {

  protected readonly cache = new Map<string, Place>()

  protected readonly regex = /lat([\d.\-]+)lng([\d.\-]+)/

  protected constructor(readonly rootDir: string) {
  }

  async read(fileName: string): Promise<Place> {
    const fileBuffer = fs.readFileSync(fileName)
    const execArray = this.regex.exec(fileName)
    if (!execArray) {
      throw Error("file name must match " + this.regex.source)
    }
    const location = new PlaceLocation(parseFloat(execArray[1]), parseFloat(execArray[2]))
    const fileContent = fileBuffer.toString()
    const fileObj = JSON.parse(fileContent)
    const place = {location, ...fileObj} as Place
    this.cachePlace(place)
    return place
  }

  async get(address: string): Promise<Place | undefined> {
    let place = this.cache.get(address)
    if (!place) {
      place = await this.create(address)
      if (place) {
        try {
          const fileName = this.getFileName(place.locations[0])
          place = await this.read(fileName)
        } catch (e) {
          if ((e as any).code === "ENOENT") {
            await this.save(place)
          } else {
            throw e
          }
        } finally {
          this.cachePlace(place)
        }
      }
    }
    return place
  }

  getFileName(location: PlaceLocation): string {
    return `${this.rootDir}/${this.key(location)}.json`
  }

  protected abstract geocode(address: string): Promise<{ location: PlaceLocation, data: any } | undefined>

  protected key(location: PlaceLocation) {
    return `lat${location.lat}lng${location.lng}`
  }

  protected abstract getElevation(location: PlaceLocation): Promise<Elevation | undefined>

  private cachePlace(place: Place) {
    place.locations.forEach(location => this.cache.set(this.key(location), place))
  }

  private async create(address: string): Promise<Place | undefined> {
    const geocodeResult = await this.geocode(address)
    if (geocodeResult) {
      const {location, data} = geocodeResult
      const elevation = await this.getElevation(location)
      return new Place([new PlaceLocation(location.lat, location.lng)], elevation, "", data)
    }
  }

  private async save(place: Place) {
    for (const location of place.locations) {
      const fileName = this.getFileName(location)
      const contents = JSON.stringify(place, null, 2)
      await writeFile(fileName, contents, "utf-8")
    }
  }
}
