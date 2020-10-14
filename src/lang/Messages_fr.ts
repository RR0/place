import {CountryCode} from "../place/country/CountryCode";
import {Messages} from "./Messages";
import {PlaceMessages} from "../place/PlaceMessages";
import {TimeMessages} from "../time/TimeMessages";
import {EventMessages} from "../time/EventMessages";
import {OrgMessages} from "../org/OrgMessages";
import {DictionaryMessages, Grammar} from "./Translator";
import {Gender} from "../people/People";


class FrenchGrammar implements Grammar {

  plural(s: string) {
    return s.endsWith('al') ? s.substring(0, s.length - 2) + 'aux' : s + 's'
  }

  at(s: string, gender: Gender): string {
    return 'aàâäéeêèiïîoôuùûy'.includes(s.charAt(0)) ? `à l'` : gender === Gender.male ? 'au ' : gender === Gender.female ? 'à la ' : 'à l'
  }
}

export const grammar_fr = new FrenchGrammar()


class FrenchMessages implements Messages {
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'une société produisant des ${products:plural}',
    company_nationality: 'une société ${nationality}',
    company_nationality_products: 'une société ${nationality} produisant des ${products:plural}',
    long_school: '${long}',
    school: 'école',
    army: 'armée',
  }
  place: PlaceMessages = {
    country: {
      [CountryCode.cz]: {
        name: 'Tchéquie',
        nationality: {
          male: 'tchèque',
          female: 'tchèque',
        },
        state: {}
      },
      [CountryCode.cs]: {
        name: 'Tchécoslovaquie',
        nationality: {
          male: 'tchécoslovaque',
          female: 'tchécoslovaque',
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
          female: 'américaine',
        },
        state: {
          il: {short: 'IL', long: 'Illinois'}
        }
      },
    }
  }
  event: EventMessages = {
    default: '${when} à ${where} ${type}',
    people: {
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
      occupation: {
        org_role_verb: "travaille comme ${role} pour ${org}",
        org_verb: "travaille pour ${org}",
        org_role: "${role} pour ${org}",
        type: "dans ${type}",
      },
      study: {
        at_school_verb: "étudie ${at}${school}",
      }
    },
    org: {
      foundation: {
        label: '${org} est fondée le ${when} à ${where}',
        org: {
          short: '${short}',
          long: '${long}',
          short_long: '<abbr title="${long}">${short}</abbr>',
          company_products: '(une société vendant des ${products:plural})',
          company_nationality: '(une société ${nationality})',
          company_nationality_products: '(une société ${nationality} vendant des ${products:plural})',
          school: '(une école)',
          long_school: '($long)',
          army: 'armée',
        },
        founder: {
          anonymous: {
            nationality: ' par un ${nationality}'
          }
        },
        founders: {
          and: " et ",
          anonymous: {
            nationality: " par des fondateurs ${nationality}",
            nationalities: " par un fondateur ${nationality}"
          }
        }
      }
    }
  }
  time: TimeMessages = {
    before: 'avant le ${date}'
  }
  dict: DictionaryMessages = {
    cigar: {
      male: 'cigare',
    },
    company: {
      female: 'société',
    },
    general: {
      male: 'général',
      female: 'générale'
    },
    highSchool: {
      male: 'lycée'
    },
    primarySchool: {
      female: 'école'
    },
    worker: {
      male: 'ouvrier',
      female: 'ouvrière'
    }
  }
}

export const messages_fr = new FrenchMessages()
