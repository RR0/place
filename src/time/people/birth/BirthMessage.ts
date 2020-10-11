export interface ChildMessage {
  male: string
  female: string
}


export interface BirthMessage {
  label: string
  child: ChildMessage
  father: BornFromParentMessage
  mother: BornFromParentMessage
  parents: BornFromParentsMessage
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
