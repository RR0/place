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

interface OccupationMessage {
  label: string
  role: string
  for: string
}

export interface EventMessage {
  default: string
  born: BornMessage
  occupation: OccupationMessage
}

export interface TimeMessage {
  before: string
}

export interface OrgMessage {
  type: {
    [OrganizationType.company]: string
    [OrganizationType.army]: string
  },
  role: {
    [OccupationRole.worker]: string
    [OccupationRole.general]: string
  }
}

export interface DictionaryMessage {
  cigar: string
}

export interface Message {
  org: OrgMessage
  time: TimeMessage
  place: PlaceMessage
  event: EventMessage
  dict: DictionaryMessage
}
