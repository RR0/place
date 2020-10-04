import {CountryCode} from "../place/CountryCode";
import {Message} from "./Message";

export const message_en: Message = {
  place: {
    country: {
      [CountryCode.cz]: {
        name: 'Czechia',
        nationality: 'czech'
      },
      [CountryCode.cs]: {
        name: 'Czechoslovakia',
        nationality: 'czechoslovak'
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: 'french',
      },
      [CountryCode.sk]: {
        name: 'Slovakia',
        nationality: 'slovak'
      },
      [CountryCode.us]: {
        name: 'USA',
        nationality: 'american'
      },
    }
  },
  event: {
    default: '${when} at ${where} ${type}',
    born: '${who} was born on ${when} at ${where}'
  }
}
