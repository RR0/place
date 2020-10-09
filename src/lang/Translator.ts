export class Translator<T> {

  constructor(readonly locale: string, readonly messages: T, private plural: (s: string) => string) {
  }

  compoundKey(subKeys: string[]): string {
    return subKeys.sort().join('_')
  }

  translate(template: string, values: { [valueKey: string]: any } = {}): string {
    console.assert(template, 'Translation requires a template')
    let translated = template
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        if (value) {
          translated = translated.replace(`\$\{${`${key}:plural`}\}`, this.plural(value) as any as string)
          translated = translated.replace(`\$\{${key}\}`, value as any as string)
        }
      }
    }
    return translated;
  }
}
