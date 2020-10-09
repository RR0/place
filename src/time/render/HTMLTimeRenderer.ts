import {RR0Time, TimeRenderer, TimeRenderOptions} from "../Time";
import {DateTime} from "../DateTime";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {BeforeTime} from "../BeforeTime";
import {WithTimeMessages} from "../../lang/Messages";


export class HTMLTimeRenderer extends HTMLRenderer implements TimeRenderer<HTML> {

  constructor(translator: Translator<WithTimeMessages>) {
    super(translator)
  }

  render(time: RR0Time, options: TimeRenderOptions): HTML {
    return time.toString();
  }

  renderDate(time: DateTime, options: TimeRenderOptions): HTML {
    return time.date.toLocaleDateString(this.translator.locale, options);
  }

  renderBefore(time: BeforeTime, options: TimeRenderOptions): HTML {
    const date = time.aboveTime.render(this, options);
    return this.translator.translate(this.translator.messages.time.before, {date});
  }
}
