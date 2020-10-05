import {Timeline} from "./time/Timeline";
import {HTMLPlaceRenderer} from "./place/render/HTMLPlaceRenderer";
import {HTMLPeopleRenderer, NameCase} from "./people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./time/render/HTMLTimeRenderer";
import {HTMLEventRenderer} from "./time/render/HTMLEventRenderer";
import {Translator} from "./lang/Translator";
import {HTML, HTMLRenderer} from "./HTMLRenderer";
import {People, PeopleRenderer} from "./people/People";
import {HTMLOccupationRenderer} from "./time/render/HTMLOccupationRenderer";
import {HTMLOrganizationRenderer} from "./org/render/HTMLOrganizationRenderer";

export class HTMLDocRenderer extends HTMLRenderer implements PeopleRenderer<HTML> {

  readonly placeRenderer = new HTMLPlaceRenderer(this.translator);
  readonly peopleRenderer = new HTMLPeopleRenderer(this.translator);
  readonly timeRenderer = new HTMLTimeRenderer(this.translator);
  readonly orgRenderer = new HTMLOrganizationRenderer(this.translator);
  readonly occupationRenderer = new HTMLOccupationRenderer(this.translator, this.orgRenderer);
  readonly eventRenderer = new HTMLEventRenderer(this.translator, this.peopleRenderer, this.placeRenderer, this.timeRenderer, this.occupationRenderer);
  protected events: Timeline = new Timeline()

  constructor(translator: Translator) {
    super(translator);
  }

  render(people: People): HTML {
    const titleHTML = `<h1>${this.peopleRenderer.render(people, {name: {middle: NameCase.camelCase}})}</h1>`;
    const bioHTML = this.renderBio(people);
    return titleHTML + bioHTML;
  }

  private renderBio(people: People): HTML {
    let bioHTML = ''
    for (const event of people.events) {
      bioHTML += this.paragraph(event.render(this.eventRenderer) + '.')
    }
    return bioHTML
  }
}
