import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {StudyEvent, StudyEventRenderer, StudyRenderOptions} from "./StudyEvent";
import {OrganizationRenderer} from "../../../org/Organization";
import {WithEventMessages} from "../../EventMessages";
import {HTMLPeopleRenderer} from "../../../people/render/HTMLPeopleRenderer";
import {Translation} from "@rr0/lang";
import {StringUtils} from "@rr0/common";


export class HTMLStudyRenderer extends HTMLRenderer implements StudyEventRenderer<HTML> {

  constructor(translation: Translation<WithEventMessages>, private orgRenderer: OrganizationRenderer<HTML>, private peopleRenderer: HTMLPeopleRenderer) {
    super(translation)
  }

  renderStudy(study: StudyEvent, options: StudyRenderOptions): HTML {
    const values: any = {}
    values.who = this.peopleRenderer.render(study.who, options.who)
    const school = study.school;
    if (school) {
      values.school = school.render(this.orgRenderer, options.org)
    }
    const translator = this.translation;
    const schoolStr = values.school;
    if (schoolStr) {
      const schoolType = school.schoolType
      const schoolTypeDict = translator.messages.dict[schoolType];
      if (!schoolTypeDict) {
        throw Error(`Could not find school type ${StringUtils.toString(schoolType)} in dictionary`)
      }
      const schoolGender = translator.getGender(schoolTypeDict);
      const schoolTypeTranslation = schoolTypeDict[Object.keys(schoolTypeDict)[0]];
      values.at = translator.grammar.at(schoolTypeTranslation, schoolGender)
    }
    const key = translator.compoundKey(Object.keys(values).concat(options.verb ? 'verb' : []))
    return translator.translateKey(translator.messages.event.people.study, key, values)
  }
}
