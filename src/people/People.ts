import {RR0Event} from '../time/Event'
import {BornEvent} from "../time/BornEvent";

export class People {
  readonly events: RR0Event[] = []
  readonly parents: People[] = []

  constructor(readonly firstName: string, readonly lastName: string, readonly middleName?: string) {
  }

  get name() {
    return `${this.firstName} ${this.middleName ? `${this.middleName} ` : ''}${this.lastName}`
  }

  get nationality() {
    let nationality
    const born = this.events.find(event => event instanceof BornEvent)
    if (born) {
      const bornPlace = born.where
    }
    return nationality
  }
}
