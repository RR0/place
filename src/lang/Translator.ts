import {message_fr} from "./Message_fr";
import {message_en} from "./Message_en";
import {Message} from "./Message";

export class Translator {

  readonly messages: { [lang: string]: Message } = {fr: message_fr, en: message_en}

  constructor(readonly locale: string) {
  }

  translate(messageKey: string, values: { [valueKey: string]: any } = {}): string {
    let obj = this.messages[this.locale]
    const levels = messageKey.split('.');
    for (const level of levels) {
      obj = (obj as any)[level] as any
    }
    const template = obj as any as string
    let translated = template
    for (const value in values) {
      if (values.hasOwnProperty(value)) {
        translated = translated.replace(`\$\{${value}\}`, values[value] as any as string)
      }
    }
    return translated;
  }
}
