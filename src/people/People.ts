import {PeopleRenderOptions} from "./render/HTMLPeopleRenderer";
import {Entity} from "../Entity";


export interface PeopleRenderer<R> {
  render(people: People, options: PeopleRenderOptions): R
}

export enum Gender {
  male = 'male',
  female = 'female'
}


export class People extends Entity {

  constructor(readonly gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
    super();
  }

  render<R>(renderer: PeopleRenderer<R>, options: PeopleRenderOptions): R {
    return renderer.render(this, options)
  }
}
