import {Timeline} from "./time/Timeline";
import {Translator} from "./lang/Translator";

export abstract class Renderer {

  protected events: Timeline = new Timeline()

  protected constructor(protected readonly translator: Translator) {
  }
}
