import {People, PeopleRenderer} from "../People";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";


export enum NameCase {
  none = "none",
  unchanged = "unchanged",
  camelCase = "camelCase",
  upperCase = "upperCase",
  initials = "initials"
}

class NameCaseUtil {

  static apply(name: string, cas: NameCase): string {
    switch (cas) {
      case NameCase.none:
        name = ''
        break;
      case NameCase.camelCase:
        name = name.charAt(0).toLocaleUpperCase() + name.substring(1)
        break;
      case NameCase.upperCase:
        name = name.toLocaleUpperCase()
        break;
      case NameCase.initials:
        name = name.charAt(0).toLocaleUpperCase() + '.'
        break;
    }
    return name
  }
}

export interface PeopleRenderOptions {
  name?: {
    first?: NameCase
    middle?: NameCase
    last?: NameCase
  },
}


export class HTMLPeopleRenderer extends HTMLRenderer implements PeopleRenderer<HTML> {

  private readonly defaultFirstName = NameCase.camelCase
  private readonly defaultLastName = NameCase.camelCase
  private readonly defaultMiddleName = NameCase.initials

  constructor(translator: Translator) {
    super(translator);
  }

  render(people: People, options: PeopleRenderOptions = {}): HTML {
    const nameOptions = options.name || {}
    nameOptions.first = nameOptions.first || this.defaultFirstName
    nameOptions.middle = nameOptions.middle || this.defaultMiddleName
    nameOptions.last = nameOptions.last || this.defaultLastName
    const firstName = people.firstName ? NameCaseUtil.apply(people.firstName, nameOptions.first) : ''
    const middle = people.middleName ? NameCaseUtil.apply(people.middleName, nameOptions.middle) : ''
    const last = people.lastName ? NameCaseUtil.apply(people.lastName, nameOptions.last) : ''
    const first = `${firstName}${firstName && middle ? ' ' : ''}${middle}`
    return `${first}${first && last ? ' ' : ''}${last}`
  }
}
