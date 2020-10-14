import {Translator} from "./Translator"
import {grammar_fr} from "./Messages_fr";
import {grammar_en} from "./Messages_en";
import {Gender} from "../people/People";


test('translate key to values', () => {
  const translator = new Translator('fr', {key: 'value'}, grammar_fr)
  const translated = translator.translate(translator.messages.key)
  expect(translated).toBe('value')
})


test('translate with parameters', () => {
  const translator = new Translator('fr', {key: 'value is ${param}'}, grammar_fr)
  const translated = translator.translate(translator.messages.key, {param: 'paramValue'})
  expect(translated).toBe('value is paramValue')
})


test('translate to plurals', () => {
  {
    const translator = new Translator('fr', {
      key: 'plusieurs ${param1:plural} et ${param2:plural} mais un seul ${param1} et ${param2}'
    }, grammar_fr)
    const translated = translator.translate(translator.messages.key, {
      param1: 'cigare',
      param2: 'cheval',
    })
    expect(translated).toBe('plusieurs cigares et chevaux mais un seul cigare et cheval')
  }
  {
    const translator = new Translator('en', {
      key: 'several ${param1:plural} and ${param2:plural} but one single ${param1} and ${param2}'
    }, grammar_en)
    const translated = translator.translate(translator.messages.key, {
      param1: 'thing',
      param2: 'party',
    })
    expect(translated).toBe('several things and parties but one single thing and party')
  }
})


test('adds new translation', () => {
  const translator = new Translator('fr', {key: 'value is ${param}'}, grammar_fr)
  translator.add(translator.messages, 'newKey', 'new value is ${param}')
  const translated = translator.translate((translator.messages as any)['newKey'], {param: 'paramValue'})
  expect(translated).toBe('new value is paramValue')
})


test('plurals', () => {
  expect(grammar_fr.plural('chose')).toBe('choses')
  expect(grammar_fr.plural('cheval')).toBe('chevaux')

  expect(grammar_en.plural('thing')).toBe('things')
  expect(grammar_en.plural('party')).toBe('parties')
})


test('join words', () => {
  expect(grammar_fr.at('lycée', Gender.male)).toBe('au ')
  expect(grammar_fr.at('école', Gender.female)).toBe(`à l'`)

  expect(grammar_en.at('high school', Gender.neutral)).toBe('at the ')
})
