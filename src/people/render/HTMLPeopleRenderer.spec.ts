import {HTMLPeopleRenderer, NameCase, PeopleNameFormat} from "./HTMLPeopleRenderer";
import {Gender, People} from "../People";
import {Translator} from "../../lang/Translator";

test('render people', () => {

  const translator = new Translator('fr');
  const renderer = new HTMLPeopleRenderer(translator);
  {
    const peopleWithMiddleName = new People(Gender.male, `Josef`, 'Hynek', `Allen`);
    {
      const html = renderer.render(peopleWithMiddleName, PeopleNameFormat.middleAbbreviated);
      expect(html).toBe('Josef A. Hynek')
    }
    {
      const html = renderer.render(peopleWithMiddleName, PeopleNameFormat.full);
      expect(html).toBe('Josef Allen Hynek')
    }
  }
  {
    const peopleWithoutMiddleName = new People(Gender.male, `Jérôme`, 'Beau');
    {
      const html = renderer.render(peopleWithoutMiddleName, PeopleNameFormat.full);
      expect(html).toBe('Jérôme Beau')
    }
    {
      const html = renderer.render(peopleWithoutMiddleName, {
          name: {
            first: NameCase.camelCase,
            middle: NameCase.camelCase,
            last: NameCase.upperCase,
          }
        }
      );
      expect(html).toBe('Jérôme BEAU')
    }
  }
})


