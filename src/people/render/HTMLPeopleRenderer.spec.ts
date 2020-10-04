import {HTMLPeopleRenderer, NameCase} from "./HTMLPeopleRenderer";
import {Gender, People} from "../People";
import {Translator} from "../../lang/Translator";

test('render people', () => {

  const translator = new Translator('fr');
  const renderer = new HTMLPeopleRenderer(translator);
  {
    const peopleWithMiddleName = new People(Gender.male, `Josef`, 'Hynek', `Allen`);
    {
      const html = renderer.render(peopleWithMiddleName);
      expect(html).toBe('Josef A. Hynek')
    }
    {
      const html = renderer.render(peopleWithMiddleName, {name: {middle: NameCase.camelCase}});
      expect(html).toBe('Josef Allen Hynek')
    }
  }
  {
    const peopleWithoutMiddleName = new People(Gender.male, `Jérôme`, 'Beau');
    {
      const html = renderer.render(peopleWithoutMiddleName);
      expect(html).toBe('Jérôme Beau')
    }
    {
      const html = renderer.render(peopleWithoutMiddleName, {name: {last: NameCase.upperCase}});
      expect(html).toBe('Jérôme BEAU')
    }
  }
})


