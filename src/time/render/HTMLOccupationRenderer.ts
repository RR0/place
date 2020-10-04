import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer} from "../OccupationEvent";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translator: Translator) {
    super(translator)
  }

  renderOccupation(occupation: OccupationEvent): HTML {
    const organization = this.translator.translate(this.translator.message.org.type[occupation.organization.type])
    return this.translator.translate(this.translator.message.event.occupation, {organization});
  }
}
