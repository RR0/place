import {CountryMessage} from "./CountryMessage.js"

export interface CountriesMessage {
  [countryCode: string]: CountryMessage
}
