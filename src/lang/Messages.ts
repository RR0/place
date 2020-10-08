import {OrganizationType} from "../org/Organization";
import {OccupationRole} from "../time/OccupationEvent";

export interface CountryMessage {
  name: string
  nationality: {
    male: string
    female: string
  }
}


export interface CountriesMessage {
  [countryCode: string]: CountryMessage
}


export interface PlaceMessages {
  country: CountriesMessage
}


export interface BornFromAnonymousParentMessage {
  nationality: string
}

export interface BornFromParentMessage {
  anonymous: BornFromAnonymousParentMessage
}

export interface BornFromAnonymousParentsMessage {
  nationality: string
  nationalities: string
}

export interface BornFromParentsMessage {
  and: string
  anonymous: BornFromAnonymousParentsMessage
}

export interface ChildMessage {
  male: string,
  female: string
}

export interface BornMessage {
  label: string
  child: ChildMessage
  father: BornFromParentMessage
  mother: BornFromParentMessage
  parents: BornFromParentsMessage
}

export interface OccupationMessage {
  verb_role_org: string
  verb_org: string
  role_org: string
  type: string
}

export interface EventMessages {
  default: string
  born: BornMessage
  occupation: OccupationMessage
}

export interface TimeMessages {
  before: string
}

export interface OrgMessages {
  name: {
    short: string
    long: string
    short_long: string
  }
  type: {
    [OrganizationType.company]: string
    [OrganizationType.army]: string
  },
  role: {
    [OccupationRole.worker]: string
    [OccupationRole.general]: string
  }
}


export interface DictionaryMessages {
  cigar: string
}


export interface WithOrgMessages {
  org: OrgMessages
}

export interface WithPlaceMessages {
  place: PlaceMessages
}

export interface WithEventMessages {
  event: EventMessages
}

export interface Messages extends WithEventMessages {
  time: TimeMessages
  dict: DictionaryMessages
}
