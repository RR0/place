import {CountryCode} from "../place/CountryCode";
import {Message} from "./Message";

export const message_fr: Message = {
  place: {
    country: {
      [CountryCode.cz]: {
        name: 'Tchéquie',
        nationality: 'tchèque',
      },
      [CountryCode.cs]: {
        name: 'Tchécoslovaquie',
        nationality: 'tchécoslovaque',
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: 'française',
      },
      [CountryCode.sk]: {
        name: 'Slovaquie',
        nationality: 'slovaque',
      },
      [CountryCode.us]: {
        name: 'États-Unis',
        nationality: 'américaine',
      },
    }
  },
  event: {
    default: '${when} à ${where} ${type}',
    born: '${who} naît le ${when} à ${where}'
  }
}
