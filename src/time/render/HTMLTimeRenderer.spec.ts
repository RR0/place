import {Translator} from "../../lang/Translator";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";
import {DateTime} from "../DateTime";

const translator = new Translator('fr', messages_fr, frenchPlural);

test('renders date', () => {
  const dateTime = new DateTime(new Date(1910, 4, 1))
  const renderer = new HTMLTimeRenderer(translator);
  const renderedTime = dateTime.render(renderer)

  expect(renderedTime).toBe('dimanche 1 mai 1910')
})


