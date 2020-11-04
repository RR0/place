import {messages_fr} from "../../lang/Messages_fr";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";
import {DateTime} from "../DateTime";
import {TimeRenderFormat, TimeRenderOptions} from "../Time";
import {BeforeTime} from "../BeforeTime";
import {grammar_fr, Translation} from "@rr0/lang";


const translation = new Translation('fr', grammar_fr, messages_fr);


test('renders date', () => {
  const dateTime = new DateTime(new Date(1910, 4, 1))
  const renderer = new HTMLTimeRenderer(translation)
  const options: TimeRenderOptions = TimeRenderFormat.fullDate
  const renderedTime = dateTime.render(renderer, options)

  expect(renderedTime).toBe('dimanche 1 mai 1910')
})


test('renders none', () => {
  const dateTime = new DateTime(new Date(1910, 4, 1))
  const renderer = new HTMLTimeRenderer(translation)
  const options: TimeRenderOptions = TimeRenderFormat.none
  const renderedTime = dateTime.render(renderer, options)

  expect(renderedTime).toBe('')
})


test('renders before date', () => {
  const beforeTime = new BeforeTime(new DateTime(new Date(1910, 4, 1)))
  const renderer = new HTMLTimeRenderer(translation)
  const options: TimeRenderOptions = TimeRenderFormat.fullDate
  const renderedTime = beforeTime.render(renderer, options)

  expect(renderedTime).toBe('avant le dimanche 1 mai 1910')
})


