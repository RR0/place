import {RR0Time, TimeRenderer, TimeRenderOptions} from "../Time";
import {DateTime} from "../DateTime";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {BeforeTime} from "../BeforeTime";
import {WithTimeMessages} from "../TimeMessages";


export class HTMLTimeRenderer extends HTMLRenderer implements TimeRenderer<HTML> {

  constructor(translator: Translator<WithTimeMessages>) {
    super(translator)
  }

  render(time: RR0Time, options: TimeRenderOptions): HTML {
    return time.toString();
  }

  renderDate(time: DateTime, options: TimeRenderOptions): HTML {
    const nativeOptions: any = {}
    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        const value = (options as any)[option]
        if (value != 'none') {
          nativeOptions[option] = value
        }
      }
    }
    return Object.keys(nativeOptions).length > 0 ? time.date.toLocaleDateString(this.translator.locale, nativeOptions) : '';
  }

  renderBefore(time: BeforeTime, options: TimeRenderOptions): HTML {
    const date = time.aboveTime.render(this, options);
    return date ? this.translator.translate(this.translator.messages.time.before, {date}) : '';
  }
}
