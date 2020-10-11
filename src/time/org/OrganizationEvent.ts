import {RR0Event, RR0EventType} from "../Event";
import {RR0Time} from "../Time";
import {Organization} from "../../org/Organization";
import {Place} from "../../place/Place";


/**
 * Something that occurred about some organization.
 */
export abstract class OrganizationEvent extends RR0Event {

  protected constructor(type: RR0EventType, readonly org: Organization, when?: RR0Time, where?: Place) {
    super(type, when, where);
  }
}
