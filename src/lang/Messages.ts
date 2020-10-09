import {OrganizationType} from "../org/Organization";
import {DictionaryMessages} from "./Dictionary";

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
  org_role_verb: string
  org_verb: string
  org_role: string
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
  short: string
  long: string
  short_long: string
  company_products: string
  company_nationality: string
  company_nationality_products: string
  [OrganizationType.army]: string
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


export interface WithTimeMessages {
  time: TimeMessages
}

export interface Messages extends WithTimeMessages {
  dict: DictionaryMessages
}
