import {Translator} from "../../lang/Translator"
import {EventRenderer, EventRenderOptions, RR0Event} from "../Event"
import {HTML, HTMLRenderer} from "../../HTMLRenderer"
import {PlaceRenderer} from "../../place/Place";
import {TimeRenderer} from "../Time";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "../people/occupation/OccupationEvent";
import {BirthEvent, BirthEventRenderer, BirthEventRenderOptions} from "../people/birth/BirthEvent";
import {WithEventMessages} from "../EventMessages";
import {
  FoundationEvent,
  FoundationEventRenderer,
  FoundationEventRenderOptions
} from "../org/foundation/FoundationEvent";
import {StudyEvent, StudyEventRenderer, StudyRenderOptions} from "../people/study/StudyEvent";

/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends HTMLRenderer implements EventRenderer<HTML> {
  constructor(
    translator: Translator<WithEventMessages>,
    private placeRenderer: PlaceRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
    private birthEventRenderer: BirthEventRenderer<HTML>,
    private foundationRenderer: FoundationEventRenderer<HTML>,
    private studyRenderer: StudyEventRenderer<HTML>,
  ) {
    super(translator)
  }

  render(event: RR0Event, options: EventRenderOptions): HTML {
    return this.translator.translate(this.translator.messages.event.default, {
      when: event.when ? event.when.render(this.timeRenderer, options.time) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }

  renderBirth(birth: BirthEvent, options: BirthEventRenderOptions): HTML {
    return this.birthEventRenderer.renderBirth(birth, options)
  }

  renderOccupation(event: OccupationEvent, options: OccupationRenderOptions): HTML {
    return this.occupationRenderer.renderOccupation(event, options)
  }

  renderFoundation(event: FoundationEvent, options: FoundationEventRenderOptions): HTML {
    return this.foundationRenderer.renderFoundation(event, options);
  }

  renderStudy(event: StudyEvent, options: StudyRenderOptions): HTML {
    return this.studyRenderer.renderStudy(event, options);
  }
}
