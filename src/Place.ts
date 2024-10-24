import { PlaceLocation } from "./location"
import { RR0Data, RR0Event } from "@rr0/data"

export type Elevation = {
  elevation: number,
  data?: any
}

export class Place implements RR0Data {
  readonly id: string
  readonly events: RR0Event[] = []

  constructor(
    readonly locations: PlaceLocation[], readonly elevation?: Elevation, readonly dirName?: string,
    /**
     * Remote geo IP service specific data.
     */
    data?: any
  ) {
    this.id = dirName
  }

  /**
   *
   * @param {float} lat Latitude in decimal degrees. North is positive.
   * @param {float} lng Longitude in decimal degrees. East is positive.
   */
  static fromLocation(lat: number, lng: number): Place {
    return new Place([new PlaceLocation(lat, lng)])
  }

  static fromDMS(latLng: string): Place {
    return new Place([PlaceLocation.fromDMS(latLng)])
  }
}

export const placeDirName = "place/systeme/solaire/planete/terre/"
