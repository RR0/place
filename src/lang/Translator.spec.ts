import {Translator} from "./Translator"
import {englishPlural} from "./Messages_en"
import {frenchPlural} from "./Messages_fr";


test('translate key to values', () => {
  const translator = new Translator('fr', {key: 'value'}, frenchPlural)
  const translated = translator.translate(translator.messages.key)
  expect(translated).toBe('value')
})


test('translate with parameters', () => {
  const translator = new Translator('fr', {key: 'value is ${param}'}, frenchPlural)
  const translated = translator.translate(translator.messages.key, {param: 'paramValue'})
  expect(translated).toBe('value is paramValue')
})


test('translate to plurals', () => {
  {
    const translator = new Translator('fr', {
      key: 'plusieurs ${param1:plural} et ${param2:plural} mais un seul ${param1} et ${param2}'
    }, frenchPlural)
    const translated = translator.translate(translator.messages.key, {
      param1: 'cigare',
      param2: 'cheval',
    })
    expect(translated).toBe('plusieurs cigares et chevaux mais un seul cigare et cheval')
  }
  {
    const translator = new Translator('en', {
      key: 'several ${param1:plural} and ${param2:plural} but one single ${param1} and ${param2}'
    }, englishPlural)
    const translated = translator.translate(translator.messages.key, {
      param1: 'thing',
      param2: 'party',
    })
    expect(translated).toBe('several things and parties but one single thing and party')
  }
})


test('adds new translation', () => {
  const translator = new Translator('fr', {key: 'value is ${param}'}, frenchPlural)
  const translated = translator.translate(translator.messages.key, {param: 'paramValue'})
  expect(translated).toBe('value is paramValue')
})
