import {CountryCode} from "../place/CountryCode";
import {DictionaryMessages, EventMessages, Messages, OrgMessages, PlaceMessages, TimeMessages} from "./Messages";
import {OccupationRole} from "../time/OccupationEvent";
import {OrganizationType} from "../org/Organization";

export function frenchPlural(s: string) {
  return s.endsWith('al') ? s.substring(0, s.length - 2) + 'aux' : s + 's'
}

class FrenchMessages implements Messages {
  org: OrgMessages = {
    name: {
      short: '${short}',
      long: '${long}',
      short_long: '<abbr title="${long}">${short}</abbr>',
    },
    type: {
      [OrganizationType.company]: 'une société produisant des ${products:plural}',
      [OrganizationType.army]: 'armée',
    },
    role: {
      [OccupationRole.worker]: 'ouvrier',
      [OccupationRole.general]: "général"
    }
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
      verb_role_org: "travaille comme ${role} pour ${org}",
      verb_org: "travaille pour ${org}",
      role_org: "${role} pour ${org}",
      type: "dans ${type}",
    }
  }
  time: TimeMessages = {
    before: 'avant le ${date}'
  }
  dict: DictionaryMessages = {
    cigar: 'cigare'
  }
}

export const messages_fr = new FrenchMessages();
