import {CountriesMessage} from "./country/CountriesMessage";


export interface PlaceMessages {
  country: CountriesMessage
}


export interface WithPlaceMessages {
  place: PlaceMessages
}
