import {Translation} from "@rr0/lang";


export abstract class Renderer<M = any> {

  protected constructor(protected readonly translation: Translation<M>) {
  }

  protected sentence(str: string) {
    return str.charAt(0).toLocaleUpperCase(this.translation.locale) + str.substring(1) + '.'
  }
}
