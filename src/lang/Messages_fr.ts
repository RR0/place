import {CountryCode} from "../place/CountryCode";
import {EventMessages, Messages, OrgMessages, PlaceMessages, TimeMessages} from "./Messages";
import {DictionaryMessages} from "./Dictionary";
import {OccupationRole} from "../time/people/occupation/OccupationEvent";


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
    [OccupationRole.general]: {
      male: 'général',
      female: 'générale'
    },
    [OccupationRole.worker]: {
      male: 'ouvrier',
      female: 'ouvrière'
    }
  }
}

export const messages_fr = new FrenchMessages();
