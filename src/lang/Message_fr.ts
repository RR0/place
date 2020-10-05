import {CountryCode} from "../place/CountryCode";
import {Message} from "./Message";
import {OccupationRole} from "../time/OccupationEvent";
import {OrganizationType} from "../org/Organization";

class FrenchMessage implements Message {
  org = {
    type: {
      [OrganizationType.company]: 'société',
      [OrganizationType.army]: 'armée',
    },
    role: {
      [OccupationRole.worker]: 'ouvrier',
      [OccupationRole.general]: "général"
    }
  }
  place = {
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
  event = {
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
      label: "travaille",
      role: " comme ${role}",
      for: " pour"
    }
  }
  time = {
    before: ' avant le ${date}'
  }
  dict = {
    cigar: 'cigare'
  }
}

export const message_fr = new FrenchMessage();
