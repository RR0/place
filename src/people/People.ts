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

  constructor(readonly gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
  }

  render<R>(renderer: PeopleRenderer<R>): R {
    return renderer.render(this)
  }
}
