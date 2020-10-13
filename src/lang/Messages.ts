import {WithTimeMessages} from "../time/TimeMessages";
import {WithEventMessages} from "../time/EventMessages";
import {WithPlaceMessages} from "../place/PlaceMessages";
import {WithOrgMessages} from "../org/OrgMessages";
import {DictionaryMessages} from "./Translator";


export interface Messages extends WithTimeMessages, WithEventMessages, WithPlaceMessages, WithOrgMessages {
  dict: DictionaryMessages
}
