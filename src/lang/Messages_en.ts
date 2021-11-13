import {CountryCode} from "place/country/CountryCode"
import {Messages} from "./Messages"
import {PlaceMessages} from "place/PlaceMessages"
import {TimeMessages} from "time/TimeMessages"
import {EventMessages} from "time/EventMessages"
import {OrgMessages} from "org/OrgMessages"
import {PeopleMessages} from "people/PeopleMessages"
import {KeyValue} from "@rr0/common"


class EnglishMessages implements Messages {
  people: PeopleMessages = {
    pronoun: {
      male: 'he',
      female: 'she',
      neutral: 'it'
    }
  }
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'a company that sells ${products:plural}',
    company_nationality: 'a ${nationality} company',
    company_nationality_products: 'a ${nationality} company that sells ${products:plural}',
    long_school: '${long}',
    school: 'school',
    army: 'army',
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
        org_role_verb: "works as ${role} for ${org}",
        org_verb: "works for ${org}",
        org_verb_who: "${who} works for ${org}",
        org_role: "${role} for ${org}",
        org_role_who: "${who} is ${role} for ${org}",
      },
      study: {
        at_school_verb: "studies ${at}${school}",
        at_school_verb_who: "${who} studies ${at}${school}",
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
          school: 'school',
          army: 'army',
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
  dict: KeyValue = {
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
    highSchool: {
      neutral: 'high school'
    },
    primarySchool: {
      neutral: 'school'
    },
    worker: {
      male: 'worker',
      female: 'worker',
    }
  }
}

export const messages_en = new EnglishMessages()
