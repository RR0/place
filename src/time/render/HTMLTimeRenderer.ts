import {RR0Time, TimeRenderer} from "../Time";
import {DateTime} from "../DateTime";
import {Translator} from "../../lang/Translator";
import {Renderer} from "../../Renderer";


export type HTML = string


export class HTMLTimeRenderer extends Renderer implements TimeRenderer<HTML> {

  constructor(translator: Translator) {
    super(translator)
  }

  render(time: RR0Time): HTML {
    return time.toString();
  }

  renderDate(time: DateTime): HTML {
    return time.date.toLocaleDateString(this.translator.locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }
}
