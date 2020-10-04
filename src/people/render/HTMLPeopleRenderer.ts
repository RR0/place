import {People, PeopleRenderer} from "../People";


export type HTML = string

export enum NameCase {
  unchanged = "unchanged",
  camelCase = "camelCase",
  upperCase = "upperCase",
  initials = "initials"
}

class NameCaseUtil {

  static apply(name: string, cas: NameCase): string {
    switch (cas) {
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
  firstName?: NameCase
  middleName?: NameCase
  lastName?: NameCase
}


export class HTMLPeopleRenderer implements PeopleRenderer<HTML> {

  defaultFirstName = NameCase.camelCase;
  private defaultLastName = NameCase.camelCase;
  private defaultMiddleName = NameCase.initials;

  readonly defaultOptions: PeopleRenderOptions = {
    firstName: this.defaultFirstName, lastName: this.defaultLastName, middleName: this.defaultMiddleName
  }

  render(people: People, options: PeopleRenderOptions = {}): HTML {
    options.firstName = options.firstName || this.defaultFirstName
    options.middleName = options.middleName || this.defaultMiddleName
    options.lastName = options.lastName || this.defaultLastName
    const firstName = NameCaseUtil.apply(people.firstName, options.firstName);
    const middle = `${people.middleName ? `${NameCaseUtil.apply(people.middleName, options.middleName)} ` : ''}`;
    const lastName = NameCaseUtil.apply(people.lastName, options.lastName);
    return `${firstName} ${middle}${lastName}`
  }
}
