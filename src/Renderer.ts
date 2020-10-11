import {Translator} from "./lang/Translator";

export abstract class Renderer<M = any> {

  protected constructor(protected readonly translator: Translator<M>) {
  }
}
