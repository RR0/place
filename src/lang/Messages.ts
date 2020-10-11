import {DictionaryMessages} from "./Dictionary";
import {WithTimeMessages} from "../time/TimeMessages";
import {WithEventMessages} from "../time/EventMessages";
import {WithPlaceMessages} from "../place/PlaceMessages";
import {WithOrgMessages} from "../org/OrgMessages";


export interface Messages extends WithTimeMessages, WithEventMessages, WithPlaceMessages, WithOrgMessages {
  dict: DictionaryMessages
}
