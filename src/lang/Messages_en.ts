import {KeyValue} from "@rr0/common"

import {Messages} from "./Messages.js"
import {PlaceMessages, WithPlaceMessages} from "../PlaceMessages.js"
import {CountryCode} from "../country/CountryCode.js"

export class EnglishPlaceMessages implements WithPlaceMessages, Messages {
  place: PlaceMessages = {
    country: {
      [CountryCode.cz]: {
        name: 'Czechia',
        nationality: {
          male: 'czech',
          female: 'czech'
        },
        state: {}
      },
      [CountryCode.cs]: {
        name: 'Czechoslovakia',
        nationality: {
          male: 'czechoslovak',
          female: 'czechoslovak'
        },
        state: {}
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: {
          male: 'french',
          female: 'french'
        },
        state: {
          idf: {short: 'IDF', long: 'Île de France'}
        }
      },
      [CountryCode.sk]: {
        name: 'Slovakia',
        nationality: {
          male: 'slovak',
          female: 'slovak'
        },
        state: {}
      },
      [CountryCode.us]: {
        name: 'USA',
        nationality: {
          male: 'american',
          female: 'american'
        },
        state: {
          il: {short: 'IL', long: 'Illinois'}
        }
      }
    }
  }

  dict: KeyValue = {}
}

export const messages_en = new EnglishPlaceMessages()
