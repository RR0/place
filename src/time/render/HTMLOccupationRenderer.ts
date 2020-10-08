import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "../OccupationEvent";
import {OrganizationRenderer} from "../../org/Organization";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator, private orgRenderer: OrganizationRenderer<HTML>) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent, options: OccupationRenderOptions): HTML {
    const orgMsg = this.translator.messages.org;
    const elements: string[] = []
    const values: any = {}
    if (options.verb) {
      elements.push('verb')
    }
    if (options.role) {
      const role = occupation.role;
      if (role) {
        elements.push('role')
        values['role'] = this.translator.translate(orgMsg.role[role])
      }
    }
    if (options.org) {
      const org = occupation.organization;
      if (org) {
        elements.push('org')
        values['org'] = org.render(this.orgRenderer, options.org)
      }
    }
    if (options.type) {
      elements.push('type')
      const org = occupation.organization;
      if (org) {
        values['type'] = this.translator.translate(orgMsg.type[org.type])
      }
    }
    const key = elements.join('_')
    const occupationMsg = this.translator.messages.event.occupation as any;
    return this.translator.translate(occupationMsg[key], values)
  }
}
