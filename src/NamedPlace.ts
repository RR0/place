import { Elevation, Place } from "./Place"
import { PlaceLocation } from "./location"

export class NamedPlace extends Place {

  constructor(readonly name: string, locations: PlaceLocation[] = [], readonly elevation?: Elevation,
              readonly dirName?: string) {
    super(locations, elevation, dirName)
  }

  toString(): string {
    return this.name ?? super.toString()
  }
}
