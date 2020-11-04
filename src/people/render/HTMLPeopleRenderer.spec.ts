import {HTMLPeopleRenderer, NameCase, PeopleNameFormat} from "./HTMLPeopleRenderer";
import {Gender, People} from "../People";
import {messages_fr} from "../../lang/Messages_fr";
import {grammar_fr, Translation} from "@rr0/lang";

const translation = new Translation('fr', grammar_fr, messages_fr);
const renderer = new HTMLPeopleRenderer(translation);

test('render people with middle name', () => {
  const peopleWithMiddleName = new People(Gender.male, `Josef`, 'Hynek', `Allen`);
  {
    const html = renderer.render(peopleWithMiddleName, PeopleNameFormat.middleAbbreviated);
    expect(html).toBe('Josef A. Hynek')
  }
  {
    const html = renderer.render(peopleWithMiddleName, PeopleNameFormat.full);
    expect(html).toBe('Josef Allen Hynek')
  }
})

test('render people without middle name', () => {
  const peopleWithoutMiddleName = new People(Gender.male, `Jérôme`, 'Beau');
  {
    const html = renderer.render(peopleWithoutMiddleName, PeopleNameFormat.full);
    expect(html).toBe('Jérôme Beau')
  }
  {
    const html = renderer.render(peopleWithoutMiddleName, {
        pronoun: false,
        name: {
          first: NameCase.camelCase,
          middle: NameCase.camelCase,
          last: NameCase.upperCase,
        }
      }
    );
    expect(html).toBe('Jérôme BEAU')
  }
})


test('render people as pronoun', () => {
  const peopleWithoutMiddleName = new People(Gender.male, `Jérôme`, 'Beau');
  {
    const html = renderer.render(peopleWithoutMiddleName, PeopleNameFormat.pronoun);
    expect(html).toBe('il')
  }
})


