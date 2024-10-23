import { DMS } from "../location"

export interface PlaceMessages {
  dmsLat: (dms: DMS) => string
  dmsLng: (dms: DMS) => string
}
