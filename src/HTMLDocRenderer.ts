import {HTMLPlaceRenderer} from "./place/render/HTMLPlaceRenderer";
import {HTMLPeopleRenderer, PeopleNameFormat, PeopleNameRenderOptions} from "./people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./time/render/HTMLTimeRenderer";
import {HTMLEventRenderer} from "./time/render/HTMLEventRenderer";
import {HTML, HTMLRenderer} from "./HTMLRenderer";
import {People} from "./people/People";
import {HTMLOrganizationRenderer} from "./org/render/HTMLOrganizationRenderer";
import {TimelineRenderOptions} from "./time/Timeline";
import {HTMLOccupationRenderer} from "./time/people/occupation/HTMLOccupationRenderer";
import {HTMLBirthEventRenderer} from "./time/people/birth/HTMLBirthEventRenderer";
import {HTMLStudyRenderer} from "./time/people/study/HTMLStudyRenderer";
import {HTMLFoundationEventRenderer} from "./time/org/foundation/HTMLFoundationEventRenderer";
import {RR0EventType} from "./time/Event";
import {Translation} from "@rr0/lang";


export interface HTMLDocRenderOptions {
  title: {
    name: PeopleNameRenderOptions
  }
  events: TimelineRenderOptions
}


export class HTMLDocRenderer extends HTMLRenderer {

  readonly placeRenderer = new HTMLPlaceRenderer(this.translation);
  readonly peopleRenderer = new HTMLPeopleRenderer(this.translation);
  readonly timeRenderer = new HTMLTimeRenderer(this.translation);
  readonly orgRenderer = new HTMLOrganizationRenderer(this.translation, this.placeRenderer);
  readonly occupationRenderer = new HTMLOccupationRenderer(this.translation, this.orgRenderer, this.peopleRenderer);
  readonly birthEventRenderer = new HTMLBirthEventRenderer(this.translation,
    this.peopleRenderer, this.timeRenderer, this.placeRenderer, this.occupationRenderer);
  readonly studyRenderer = new HTMLStudyRenderer(this.translation, this.orgRenderer, this.peopleRenderer)
  readonly foundationRenderer = new HTMLFoundationEventRenderer(this.translation, this.peopleRenderer, this.orgRenderer, this.timeRenderer, this.placeRenderer, this.occupationRenderer)
  readonly eventRenderer = new HTMLEventRenderer(this.translation, this.placeRenderer, this.timeRenderer, this.occupationRenderer, this.birthEventRenderer, this.foundationRenderer, this.studyRenderer);

  constructor(translation: Translation<any>) {
    super(translation);
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
