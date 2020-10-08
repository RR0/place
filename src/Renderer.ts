import {Translator} from "./lang/Translator";

export abstract class Renderer {

  protected constructor(protected readonly translator: Translator<any>) {
  }
}
