import {BornEvent} from "../time/BornEvent";
import {Timeline} from "../time/Timeline";


export interface PeopleRenderer<R> {
  render(people: People): R
}

export enum Gender {
  male = 'male',
  female = 'female'
}

export class People {
  readonly events = new Timeline()
  readonly parents: People[] = []

  constructor(readonly gender: Gender, readonly firstName: string, readonly lastName: string, readonly middleName?: string) {
  }

  get nationality() {
    let nationality
    const born = this.events.findOfType(BornEvent)
    if (born) {
      const bornPlace = born.where
    }
    return nationality
  }

  render<R>(renderer: PeopleRenderer<R>): R {
    return renderer.render(this)
  }
}
