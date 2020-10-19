import {HTMLPlaceRenderer} from "./place/render/HTMLPlaceRenderer";
import {HTMLPeopleRenderer, PeopleNameFormat, PeopleNameRenderOptions} from "./people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./time/render/HTMLTimeRenderer";
import {HTMLEventRenderer} from "./time/render/HTMLEventRenderer";
import {Translator} from "./lang/Translator";
import {HTML, HTMLRenderer} from "./HTMLRenderer";
import {People} from "./people/People";
import {HTMLOrganizationRenderer} from "./org/render/HTMLOrganizationRenderer";
import {TimelineRenderOptions} from "./time/Timeline";
import {HTMLOccupationRenderer} from "./time/people/occupation/HTMLOccupationRenderer";
import {HTMLBirthEventRenderer} from "./time/people/birth/HTMLBirthEventRenderer";
import {HTMLStudyRenderer} from "./time/people/study/HTMLStudyRenderer";
import {HTMLFoundationEventRenderer} from "./time/org/foundation/HTMLFoundationEventRenderer";
import {RR0EventType} from "./time/Event";


export interface HTMLDocRenderOptions {
  title: {
    name: PeopleNameRenderOptions
  }
  events: TimelineRenderOptions
}


export class HTMLDocRenderer extends HTMLRenderer {

  readonly placeRenderer = new HTMLPlaceRenderer(this.translator);
  readonly peopleRenderer = new HTMLPeopleRenderer(this.translator);
  readonly timeRenderer = new HTMLTimeRenderer(this.translator);
  readonly orgRenderer = new HTMLOrganizationRenderer(this.translator, this.placeRenderer);
  readonly occupationRenderer = new HTMLOccupationRenderer(this.translator, this.orgRenderer, this.peopleRenderer);
  readonly birthEventRenderer = new HTMLBirthEventRenderer(this.translator,
    this.peopleRenderer, this.timeRenderer, this.placeRenderer, this.occupationRenderer);
  readonly studyRenderer = new HTMLStudyRenderer(this.translator, this.orgRenderer, this.peopleRenderer)
  readonly foundationRenderer = new HTMLFoundationEventRenderer(this.translator, this.peopleRenderer, this.orgRenderer, this.timeRenderer, this.placeRenderer, this.occupationRenderer)
  readonly eventRenderer = new HTMLEventRenderer(this.translator, this.placeRenderer, this.timeRenderer, this.occupationRenderer, this.birthEventRenderer, this.foundationRenderer, this.studyRenderer);

  constructor(translator: Translator<any>) {
    super(translator);
  }

  render(people: People, options: HTMLDocRenderOptions): HTML {
    const titleHTML = this.renderTitle(people);
    const bioHTML = this.renderEvents(people, options.events);
    return titleHTML + bioHTML;
  }

  private renderTitle(people: People) {
    return this.h1(this.peopleRenderer.render(people, PeopleNameFormat.full));
  }

  private renderEvents(people: People, options: TimelineRenderOptions): HTML {
    let bioHTML = ''
    for (const event of people.events) {
      const renderedEvent = event.render(this.eventRenderer, options[event.type]);
      bioHTML += this.paragraph(this.sentence(renderedEvent))
      options[RR0EventType.study].who.pronoun = true
    }
    return bioHTML
  }
}
