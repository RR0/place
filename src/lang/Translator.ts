export class Translator<T> {

  constructor(readonly locale: string, readonly messages: T, private plural: (s: string) => string) {
  }

  translate(template: string, values: { [valueKey: string]: any } = {}): string {
    console.assert(template, 'Translation requires a template')
    let translated = template
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        translated = translated.replace(`\$\{${`${key}:plural`}\}`, this.plural(values[key]) as any as string)
        translated = translated.replace(`\$\{${key}\}`, values[key] as any as string)
      }
    }
    return translated;
  }
}
