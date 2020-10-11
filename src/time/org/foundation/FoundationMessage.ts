import {OrgMessages} from "../../../org/OrgMessages";


export interface FoundationMessage {
  label: string
  org: OrgMessages
  founder: FoundedFromParentMessage
  founders: FoundedFromParentsMessage
}


export interface FoundedFromAnonymousParentMessage {
  nationality: string
}


export interface FoundedFromParentMessage {
  anonymous: FoundedFromAnonymousParentMessage
}


export interface FoundedFromAnonymousParentsMessage {
  nationality: string
  nationalities: string
}


export interface FoundedFromParentsMessage {
  and: string
  anonymous: FoundedFromAnonymousParentsMessage
}
