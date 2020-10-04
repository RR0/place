import {CountryCode} from "../place/Country";

export class Translator {

  readonly messages: { [lang: string]: { [key: string]: {} | string } } = {
    fr: {
      place: {
        country: {
          [CountryCode.cz]: 'Tchéquie',
          [CountryCode.cs]: 'Tchécoslovaquie',
          [CountryCode.fr]: 'France',
          [CountryCode.sk]: 'Slovaquie',
          [CountryCode.us]: 'États-Unis',
        }
      },
      event: {
        default: '${when} à ${where} ${type}',
        born: '${who} naît le ${when} à ${where}'
      }
    },
    en: {
      place: {
        country: {
          [CountryCode.cz]: 'Czechia',
          [CountryCode.cs]: 'Czechoslovakia',
          [CountryCode.fr]: 'France',
          [CountryCode.sk]: 'Slovakia',
          [CountryCode.us]: 'USA',
        }
      },
      event: {
        default: '${when} at ${where} ${type}',
        born: '${who} was born on ${when} at ${where}'
      }
    }
  }

  constructor(readonly locale: string) {
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
