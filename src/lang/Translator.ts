export class Translator {

  readonly messages: { [lang: string]: { [key: string]: {} | string } } = {
    fr: {
      event: {
        born: '${who} naît le ${when} à ${where}'
      }
    },
    en: {
      event: {
        born: '${who} was born on ${when} at ${where}'
      }
    }
  }

  constructor(private locale: string) {
  }

  translate(messageKey: string, values: { [valueKey: string]: any } = {}): string {
    let obj = this.messages[this.locale]
    const levels = messageKey.split('.');
    for (const level of levels) {
      obj = obj[level] as any
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
