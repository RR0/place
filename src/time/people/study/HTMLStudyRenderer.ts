import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {StudyEvent, StudyEventRenderer, StudyRenderOptions} from "./StudyEvent";
import {Translator} from "../../../lang/Translator";
import {OrganizationRenderer} from "../../../org/Organization";
import {WithEventMessages} from "../../EventMessages";


export class HTMLStudyRenderer extends HTMLRenderer implements StudyEventRenderer<HTML> {

  constructor(translator: Translator<WithEventMessages>, private orgRenderer: OrganizationRenderer<HTML>) {
    super(translator)
  }

  renderStudy(study: StudyEvent, options: StudyRenderOptions): HTML {
    const values: any = {}
    if (options.org) {
      const school = study.school;
      if (school) {
        values.school = school.render(this.orgRenderer, options.org)
      }
    }
    const key = this.translator.compoundKey(Object.keys(values).concat(options.verb ? 'verb' : []))
    return this.translator.translateKey(this.translator.messages.event.people.study, key, values)
  }
}
