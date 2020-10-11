import {BirthMessage} from "./people/birth/BirthMessage";
import {FoundationMessage} from "./org/foundation/FoundationMessage";
import {OccupationMessage} from "./people/occupation/OccupationMessage";


export interface EventMessages {
  default: string
  people: {
    born: BirthMessage
    occupation: OccupationMessage
  },
  org: {
    foundation: FoundationMessage
  }
}


export interface WithEventMessages {
  event: EventMessages
}
