import {CountriesMessage} from "./country/index.js"

export interface PlaceMessages {
  country: CountriesMessage
}

export interface WithPlaceMessages {
  place: PlaceMessages
}
