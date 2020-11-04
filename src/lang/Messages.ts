import {WithTimeMessages} from "../time/TimeMessages";
import {WithEventMessages} from "../time/EventMessages";
import {WithPlaceMessages} from "../place/PlaceMessages";
import {WithOrgMessages} from "../org/OrgMessages";
import {WithPeopleMessages} from "../people/PeopleMessages";
import {KeyValue} from "@rr0/common";


export interface Messages extends WithPeopleMessages, WithTimeMessages, WithEventMessages, WithPlaceMessages, WithOrgMessages {
  dict: KeyValue
}
