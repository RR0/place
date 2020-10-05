import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer} from "../OccupationEvent";
import {HTMLOrganizationRenderer} from "../../org/render/HTMLOrganizationRenderer";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator, private orgRenderer: HTMLOrganizationRenderer) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent): HTML {
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
