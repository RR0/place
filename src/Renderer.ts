import {Translator} from "./lang/Translator";


export abstract class Renderer<M = any> {

  protected constructor(protected readonly translator: Translator<M>) {
  }

  protected sentence(str: string) {
    return str.charAt(0).toLocaleUpperCase(this.translator.locale) + str.substring(1) + '.'
  }
}
