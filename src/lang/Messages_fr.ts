import {CountryCode} from "../place/country/CountryCode";
import {Messages} from "./Messages";
import {DictionaryMessages} from "./Dictionary";
import {PlaceMessages} from "../place/PlaceMessages";
import {TimeMessages} from "../time/TimeMessages";
import {EventMessages} from "../time/EventMessages";
import {OrgMessages} from "../org/OrgMessages";


export function frenchPlural(s: string) {
  return s.endsWith('al') ? s.substring(0, s.length - 2) + 'aux' : s + 's'
}


class FrenchMessages implements Messages {
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'une société produisant des ${products:plural}',
    company_nationality: 'une société ${nationality:female}',
    company_nationality_products: 'une société ${nationality:female} produisant des ${products:plural}',
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
      }
    },
    org: {
      foundation: {
        label: '${org} est fondée le ${when} à ${where}',
        org: {
          short: '${short}',
          long: '${long}',
          short_long: '<abbr title="${long}">${short}</abbr>',
          company_products: 'a company that sells ${products:plural}',
          company_nationality: 'a ${nationality} company',
          company_nationality_products: 'a ${nationality} company that sells ${products:plural}',
          army: 'armée',
        },
        founder: {
          anonymous: {
            nationality: ' from a ${nationality} father'
          }
        },
        founders: {
          and: " and ",
          anonymous: {
            nationality: " from ${nationality} parents",
            nationalities: " from a ${fatherNationality} father and a ${motherNationality} mother"
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
    worker: {
      male: 'ouvrier',
      female: 'ouvrière'
    }
  }
}

export const messages_fr = new FrenchMessages();
