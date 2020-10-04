import {CountryCode} from "../place/CountryCode";
import {Message} from "./Message";

export const message_en: Message = {
  place: {
    country: {
      [CountryCode.cz]: {
        name: 'Czechia',
        nationality: {
          male: 'czech',
          female: 'czech',
        }
      },
      [CountryCode.cs]: {
        name: 'Czechoslovakia',
        nationality: {
          male: 'czechoslovak',
          female: 'czechoslovak',
        }
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: {
          male: 'french',
          female: 'french',
        },
      },
      [CountryCode.sk]: {
        name: 'Slovakia',
        nationality: {
          male: 'slovak',
          female: 'slovak',
        }
      },
      [CountryCode.us]: {
        name: 'USA',
        nationality: {
          male: 'american',
          female: 'american',
        }
      },
    }
  },
  event: {
    default: '${when} at ${where} ${type}',
    born: {
      label: '${who} was born on ${when} at ${where}',
      child: {
        male: ", son of ",
        female: ", daughter of "
      },
      father: {
        anonymous: {
          nationality: ' from a ${nationality} father'
        }
      },
      mother: {
        anonymous: {
          nationality: ' from a ${nationality} mother'
        }
      },
      parents: {
        and: " and ",
        anonymous: {
          nationality: " from ${nationality} parents",
          nationalities: " from a ${fatherNationality} father and a ${motherNationality} mother"
        }
      }
    }
  }
}
