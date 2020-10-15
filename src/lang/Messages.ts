import {WithTimeMessages} from "../time/TimeMessages";
import {WithEventMessages} from "../time/EventMessages";
import {WithPlaceMessages} from "../place/PlaceMessages";
import {WithOrgMessages} from "../org/OrgMessages";
import {DictionaryMessages} from "./Translator";
import {WithPeopleMessages} from "../people/PeopleMessages";


export interface Messages extends WithPeopleMessages, WithTimeMessages, WithEventMessages, WithPlaceMessages, WithOrgMessages {
  dict: DictionaryMessages
}
