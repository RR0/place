import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {WithEventMessages} from "../../../lang/Messages";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "./OccupationEvent";
import {Translator} from "../../../lang/Translator";
import {OrganizationRenderer} from "../../../org/Organization";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator<WithEventMessages>, private orgRenderer: OrganizationRenderer<HTML>) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent, options: OccupationRenderOptions): HTML {
    const values: any = {}
    if (options.role) {
      const role = occupation.role;
      if (role) {
        const gender = occupation.who.gender
        values.role = this.translator.translate(this.translator.messages.dict[role][gender])
      }
    }
    if (options.org) {
      const org = occupation.organization;
      if (org) {
        values.org = org.render(this.orgRenderer, options.org)
      }
    }
    const key = this.translator.compoundKey(Object.keys(values).concat(options.verb ? 'verb' : []))
    const occupationMsg = this.translator.messages.event.occupation as any;
    return this.translator.translate(occupationMsg[key], values)
  }
}
