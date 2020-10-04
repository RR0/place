import {OrganizationType} from "../org/Organization";

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

export interface PlaceMessage {
  country: CountriesMessage
}

interface BornFromAnonymousParentMessage {
  nationality: string
}

interface BornFromParentMessage {
  anonymous: BornFromAnonymousParentMessage
}

interface BornFromAnonymousParentsMessage {
  nationality: string
  nationalities: string
}

interface BornFromParentsMessage {
  and: string
  anonymous: BornFromAnonymousParentsMessage
}

interface ChildMessage {
  male: string,
  female: string
}

interface BornMessage {
  label: string
  child: ChildMessage
  father: BornFromParentMessage
  mother: BornFromParentMessage
  parents: BornFromParentsMessage
}

export interface EventMessage {
  default: string,
  born: BornMessage
  occupation: string;
}

interface TimeMessage {
  before: string
}

interface OrgMessage {
  type: {
    [OrganizationType.factory]: string
  }
}

export interface Message {
  org: OrgMessage
  time: TimeMessage
  place: PlaceMessage
  event: EventMessage
}
