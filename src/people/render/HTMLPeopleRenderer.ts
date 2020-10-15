import {People, PeopleRenderer} from "../People"
import {Translator} from "../../lang/Translator"
import {HTML, HTMLRenderer} from "../../HTMLRenderer"


export enum NameCase {
  none = "none",
  unchanged = "unchanged",
  camelCase = "camelCase",
  upperCase = "upperCase",
  initials = "initials"
}

class NameCaseUtil {

  static render(name: string, cas: NameCase): string {
    switch (cas) {
      case NameCase.none:
        name = ''
        break
      case NameCase.camelCase:
        name = name.charAt(0).toLocaleUpperCase() + name.substring(1)
        break
      case NameCase.upperCase:
        name = name.toLocaleUpperCase()
        break
      case NameCase.initials:
        name = name.charAt(0).toLocaleUpperCase() + '.'
        break
    }
    return name
  }
}

export class PeopleNameFormat {

  static readonly none: PeopleRenderOptions = {
    pronoun: false,
    name: {
      first: NameCase.none,
      middle: NameCase.none,
      last: NameCase.none,
    }
  }

  static readonly pronoun: PeopleRenderOptions = {
    pronoun: true,
    name: {
      first: NameCase.none,
      middle: NameCase.none,
      last: NameCase.none,
    }
  }

  static readonly full: PeopleRenderOptions = {
    pronoun: false,
    name: {
      first: NameCase.camelCase,
      middle: NameCase.camelCase,
      last: NameCase.camelCase,
    }
  }

  static readonly middleAbbreviated: PeopleRenderOptions = {
    pronoun: false,
    name: {
      first: NameCase.camelCase,
      middle: NameCase.initials,
      last: NameCase.camelCase,
    }
  }

  static readonly lastName: PeopleRenderOptions = {
    pronoun: false,
    name: {
      first: NameCase.none,
      middle: NameCase.none,
      last: NameCase.camelCase,
    }
  }
}


export interface PeopleNameRenderOptions {
  first: NameCase
  middle: NameCase
  last: NameCase
}

export interface PeopleRenderOptions {
  pronoun: boolean
  name: PeopleNameRenderOptions
}


export class HTMLPeopleRenderer extends HTMLRenderer implements PeopleRenderer<HTML> {

  constructor(translator: Translator<any>) {
    super(translator)
  }

  render(people: People, options: PeopleRenderOptions): HTML {
    let rendered
    if (options.pronoun) {
      rendered = this.translator.translate(this.translator.messages.people.pronoun[people.gender])
    } else {
      const nameOptions = options.name
      const firstName = people.firstName ? NameCaseUtil.render(people.firstName, nameOptions.first) : ''
      const middle = people.middleName ? NameCaseUtil.render(people.middleName, nameOptions.middle) : ''
      const last = people.lastName ? NameCaseUtil.render(people.lastName, nameOptions.last) : ''
      const first = `${firstName}${firstName && middle ? ' ' : ''}${middle}`
      rendered = `${first}${first && last ? ' ' : ''}${last}`
    }
    return rendered
  }
}
