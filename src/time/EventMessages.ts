import {BirthMessage} from "./people/birth/BirthMessage";
import {FoundationMessage} from "./org/foundation/FoundationMessage";
import {OccupationMessage} from "./people/occupation/OccupationMessage";
import {StudyMessage} from "./people/study/StudyMessage";


export interface EventMessages {
  default: string
  people: {
    born: BirthMessage
    occupation: OccupationMessage
    study: StudyMessage
  },
  org: {
    foundation: FoundationMessage
  }
}


export interface WithEventMessages {
  event: EventMessages
}
