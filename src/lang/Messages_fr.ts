import {KeyValue} from "@rr0/common"

import {Messages} from "./Messages.js"
import {PlaceMessages, WithPlaceMessages} from "../PlaceMessages.js"
import {CountryCode} from "../country/CountryCode.js"

export class FrenchPlaceMessages implements WithPlaceMessages, Messages {
  place: PlaceMessages = {
    country: {
      [CountryCode.cz]: {
        name: 'Tchéquie',
        nationality: {
          male: 'tchèque',
          female: 'tchèque'
        },
        state: {}
      },
      [CountryCode.cs]: {
        name: 'Tchécoslovaquie',
        nationality: {
          male: 'tchécoslovaque',
          female: 'tchécoslovaque'
        },
        state: {}
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: {
          male: 'français',
          female: 'française'
        },
        state: {
          idf: {short: 'IDF', long: 'Île de France'}
        }
      },
      [CountryCode.sk]: {
        name: 'Slovaquie',
        nationality: {
          male: 'slovaque',
          female: 'slovaque'
        },
        state: {}
      },
      [CountryCode.us]: {
        name: 'États-Unis',
        nationality: {
          male: 'américain',
          female: 'américaine'
        },
        state: {
          il: {short: 'IL', long: 'Illinois'}
        }
      }
    }
  }

  dict: KeyValue = {}
}

export const messages_fr = new FrenchPlaceMessages()
