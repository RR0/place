import {HTMLPeopleRenderer, NameCase} from "./HTMLPeopleRenderer";
import {Gender, People} from "../People";

test('render people', () => {
  const renderer = new HTMLPeopleRenderer();
  {
    const peopleWithMiddleName = new People(Gender.male, `Josef`, 'Hynek', `Allen`);
    {
      const html = renderer.render(peopleWithMiddleName);
      expect(html).toBe('Josef A. Hynek')
    }
    {
      const html = renderer.render(peopleWithMiddleName, {middleName: NameCase.camelCase});
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
      const html = renderer.render(peopleWithoutMiddleName, {lastName: NameCase.upperCase});
      expect(html).toBe('Jérôme BEAU')
    }
  }
})


