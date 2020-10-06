import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "../OccupationEvent";
import {OrganizationRenderer} from "../../org/Organization";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator, private orgRenderer: OrganizationRenderer<HTML>) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent, options: OccupationRenderOptions): HTML {
    const orgMsg = this.translator.message.org;
    const organization = occupation.organization;
    const orgType = this.translator.translate(orgMsg.type[organization.type])
    const role = this.translator.translate(orgMsg.role[occupation.role])
    const work = this.translator.translate(this.translator.message.event.occupation.label)
    const roleStr = this.translator.translate(this.translator.message.event.occupation.role, {role})
    const org = organization.render(this.orgRenderer)
    return work + roleStr + org
  }
}
