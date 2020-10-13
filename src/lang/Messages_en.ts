import {CountryCode} from "../place/country/CountryCode";
import {Messages} from "./Messages";
import {DictionaryMessages} from "./Dictionary";
import {PlaceMessages} from "../place/PlaceMessages";
import {TimeMessages} from "../time/TimeMessages";
import {EventMessages} from "../time/EventMessages";
import {OrgMessages} from "../org/OrgMessages";


export function englishPlural(s: string) {
  return s.endsWith('y') ? s.substring(0, s.length - 1) + 'ies' : s + 's'
}


class EnglishMessages implements Messages {
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'a company that sells ${products:plural}',
    company_nationality: 'a ${nationality} company',
    company_nationality_products: 'a ${nationality} company that sells ${products:plural}',
    long_school: '${long}',
    school: 'une école',
    army: 'armée',
  }
  place: PlaceMessages = {
    country: {
      [CountryCode.cz]: {
        name: 'Czechia',
        nationality: {
          male: 'czech',
          female: 'czech',
        },
        state: {}
      },
      [CountryCode.cs]: {
        name: 'Czechoslovakia',
        nationality: {
          male: 'czechoslovak',
          female: 'czechoslovak',
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
          female: 'slovak',
        },
        state: {}
      },
      [CountryCode.us]: {
        name: 'USA',
        nationality: {
          male: 'american',
          female: 'american',
        },
        state: {
          il: {short: 'IL', long: 'Illinois'}
        }
      },
    }
  }
  event: EventMessages = {
    default: '${when} at ${where} ${type}',
    people: {
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
      },
      study: {
        school_verb: "studies at ${school}",
      }
    },
    org: {
      foundation: {
        label: '${who} was founded on ${when} at ${where}',
        org: {
          short: '${short}',
          long: '${long}',
          short_long: '<abbr title="${long}">${short}</abbr>',
          company_products: 'a company that sells ${products:plural}',
          company_nationality: 'a ${nationality} company',
          company_nationality_products: 'a ${nationality} company that sells ${products:plural}',
          long_school: '${long}',
          school: 'une école',
          army: 'armée',
        },
        founder: {
          anonymous: {
            nationality: ' by a ${nationality}'
          }
        },
        founders: {
          and: " and ",
          anonymous: {
            nationality: " by ${nationality} founders",
            nationalities: " by a ${nationality} founder"
          }
        }
      }
    }
  }
  time: TimeMessages = {
    before: 'before ${date}'
  }
  dict: DictionaryMessages = {
    cigar: {
      neutral: 'cigar',
    },
    company: {
      neutral: 'company',
    },
    general: {
      male: 'general',
      female: 'general',
    },
    worker: {
      male: 'worker',
      female: 'worker',
    }
  }
}

export const messages_en = new EnglishMessages()
