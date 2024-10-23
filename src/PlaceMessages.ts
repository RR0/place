import { CountriesMessage } from "./country"

/**
 * @deprecated
 */
export interface PlaceMessages {
  /**
   * @deprecated Use org package for that
   */
  country: CountriesMessage
}

export interface WithPlaceMessages {
  place: PlaceMessages
}
