import {RR0Time, TimeRenderer} from "../Time";
import {DateTime} from "../DateTime";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";


export class HTMLTimeRenderer extends HTMLRenderer implements TimeRenderer<HTML> {

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
