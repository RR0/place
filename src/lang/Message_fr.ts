import {CountryCode} from "../place/CountryCode";
import {Message} from "./Message";

export const message_fr: Message = {
  org: {
    type: {
      factory: 'usine'
    }
  },
  place: {
    country: {
      [CountryCode.cz]: {
        name: 'Tchéquie',
        nationality: {
          male: 'tchèque',
          female: 'tchèque',
        },
      },
      [CountryCode.cs]: {
        name: 'Tchécoslovaquie',
        nationality: {
          male: 'tchécoslovaque',
          female: 'tchécoslovaque',
        },
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: {
          male: 'français',
          female: 'française'
        },
      },
      [CountryCode.sk]: {
        name: 'Slovaquie',
        nationality: {
          male: 'slovaque',
          female: 'slovaque'
        },
      },
      [CountryCode.us]: {
        name: 'États-Unis',
        nationality: {
          male: 'américain',
          female: 'américaine',
        },
      },
    }
  },
  event: {
    default: '${when} à ${where} ${type}',
    born: {
      label: '${who} naît le ${when} à ${where}',
      child: {
        male: ", fils de ",
        female: ", fille de "
      },
      father: {
        anonymous: {
          nationality: " d'un père ${nationality}"
        }
      },
      mother: {
        anonymous: {
          nationality: " d'une mère ${nationality}"
        }
      },
      parents: {
        and: " et ",
        anonymous: {
          nationality: " de parents ${nationality}s",
          nationalities: " d'un père ${fatherNationality} et d'une mère ${motherNationality}"
        }
      }
    },
    occupation: "travaille pour ${organization}"
  },
  time: {
    before: ' avant le ${date}'
  }
}
