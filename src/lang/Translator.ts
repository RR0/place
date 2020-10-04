import {message_fr} from "./Message_fr";
import {message_en} from "./Message_en";
import {Message} from "./Message";

export class Translator {

  readonly messages: { [lang: string]: Message } = {fr: message_fr, en: message_en}

  constructor(readonly locale: string) {
  }

  get message(): Message {
    return this.messages[this.locale];
  }

  translate(template: string, values: { [valueKey: string]: any } = {}): string {
    let translated = template
    for (const value in values) {
      if (values.hasOwnProperty(value)) {
        translated = translated.replace(`\$\{${value}\}`, values[value] as any as string)
      }
    }
    return translated;
  }
}
