import {RR0Event} from "./Event";


export interface TimelineRenderer<R> {
  render(timeline: Timeline): R
}


export class Timeline implements Iterable<RR0Event> {

  private readonly events: RR0Event[] = []

  add(event: RR0Event) {
    this.events.push(event)
  }

  get(index: number): RR0Event {
    return this.events[index]
  }

  findOfType(type: any) {
    return this.events.find(event => event instanceof type)
  }

  [Symbol.iterator](): Iterator<RR0Event> {
    return this.events[Symbol.iterator]();
  }

  render<R>(renderer: TimelineRenderer<R>): R {
    return renderer.render(this)
  }
}
