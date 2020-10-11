import {PeopleRenderOptions} from "./render/HTMLPeopleRenderer";
import {Timeline} from "../time/Timeline";
import {Country} from "../place/country/Country";


export enum Gender {
  neutral = 'neutral',
  male = 'male',
  female = 'female'
}


export interface PeopleRenderer<R> {
  render(people: People, options: PeopleRenderOptions): R
}


export class People {

  readonly events = new Timeline()

  constructor(readonly gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
  }

  render<R>(renderer: PeopleRenderer<R>, options: PeopleRenderOptions): R {
    return renderer.render(this, options)
  }

  get birthCountry(): Country | undefined {
    return this.events.get(0)?.where?.country
  }
}
