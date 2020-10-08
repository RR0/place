import {CountryCode} from "../place/CountryCode";
import {DictionaryMessages, EventMessages, Messages, OrgMessages, PlaceMessages, TimeMessages} from "./Messages";
import {OccupationRole} from "../time/OccupationEvent";
import {OrganizationType} from "../org/Organization";

class EnglishMessages implements Messages {
  org: OrgMessages = {
    name: {
      short: '${short}',
      long: '${long}',
      short_long: '<abbr title="${long}">${short}</abbr>',
    },
    type: {
      [OrganizationType.company]: 'company',
      [OrganizationType.army]: 'army',
    },
    role: {
      [OccupationRole.worker]: 'worker',
      [OccupationRole.general]: "general"
    }
  }
  place: PlaceMessages = {
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
  }
  event: EventMessages = {
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
    },
    occupation: {
      verb_role_org: "work as ${role} for ${org}",
      verb_org: "work for ${org}",
      role_org: "${role} for ${org}",
      type: "for ${type}",
    }
  }
  time: TimeMessages = {
    before: ' before ${date}'
  }
  dict: DictionaryMessages = {
    cigar: 'cigar'
  }
}

export const messages_en = new EnglishMessages()
