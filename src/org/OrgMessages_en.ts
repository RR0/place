import {KeyValue} from "@rr0/common"

import {Messages} from "./Messages.js"
import {CountryCode} from "./country/CountryCode.js"
import { OrgMessages, WithOrgMessages } from "./OrgMessages"

/**
 * @deprecated Use @rr0/org instead
 */
export class EnglishPlaceMessages implements WithOrgMessages, Messages {
  place: OrgMessages = {
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

export const orgMessages_en = new EnglishPlaceMessages()
