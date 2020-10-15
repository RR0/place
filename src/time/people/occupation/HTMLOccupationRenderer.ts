import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "./OccupationEvent";
import {Translator} from "../../../lang/Translator";
import {OrganizationRenderer} from "../../../org/Organization";
import {WithEventMessages} from "../../EventMessages";
import {HTMLPeopleRenderer} from "../../../people/render/HTMLPeopleRenderer";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator<WithEventMessages>, private orgRenderer: OrganizationRenderer<HTML>, private peopleRenderer: HTMLPeopleRenderer) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent, options: OccupationRenderOptions): HTML {
    const values: any = {}
    values.who = this.peopleRenderer.render(occupation.who, options.who)
    if (options.role) {
      const role = occupation.role;
      if (role) {
        values.role = this.translator.translate(this.translator.messages.dict[role][occupation.who.gender])
      }
    }
    if (options.org) {
      const org = occupation.organization;
      if (org) {
        values.org = org.render(this.orgRenderer, options.org)
      }
    }
    const key = this.translator.compoundKey(Object.keys(values).concat(options.verb ? 'verb' : []))
    return this.translator.translateKey(this.translator.messages.event.people.occupation, key, values)
  }
}
