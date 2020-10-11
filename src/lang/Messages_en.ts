import {CountryCode} from "../place/CountryCode";
import {EventMessages, Messages, OrgMessages, PlaceMessages, TimeMessages} from "./Messages";
import {DictionaryMessages} from "./Dictionary";
import {OccupationRole} from "../time/people/occupation/OccupationEvent";

class EnglishMessages implements Messages {
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'a company that sells ${products:plural}',
    company_nationality: 'a ${nationality} company',
    company_nationality_products: 'a ${nationality} company that sells ${products:plural}',
    army: 'armée',
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
      org_role_verb: "work as ${role} for ${org}",
      org_verb: "work for ${org}",
      org_role: "${role} for ${org}",
      type: "for ${type}",
    }
  }
  time: TimeMessages = {
    before: ' before ${date}'
  }
  dict: DictionaryMessages = {
    cigar: {
      neutral: 'cigar',
    },
    company: {
      neutral: 'company',
    },
    [OccupationRole.general]: {
      male: 'general',
      female: 'general',
    },
    [OccupationRole.worker]: {
      male: 'worker',
      female: 'worker',
    }
  }
}

export const messages_en = new EnglishMessages()
