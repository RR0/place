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
  nationalities: string;
}

interface BornFromParentsMessage {
  and: string;
  anonymous: BornFromAnonymousParentsMessage
}

interface ChildMessage {
  male: string,
  female: string
}

interface BornMessage {
  label: string
  child: ChildMessage;
  father: BornFromParentMessage;
  mother: BornFromParentMessage;
  parents: BornFromParentsMessage;
}

export interface EventMessage {
  default: string,
  born: BornMessage
}

export interface Message {
  place: PlaceMessage,
  event: EventMessage
}
