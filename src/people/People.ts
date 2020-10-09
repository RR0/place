import {PeopleRenderOptions} from "./render/HTMLPeopleRenderer";
import {Entity, Gender} from "../Entity";


export interface PeopleRenderer<R> {
  render(people: People, options: PeopleRenderOptions): R
}


export class People extends Entity {

  constructor(gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
    super(gender);
  }

  render<R>(renderer: PeopleRenderer<R>, options: PeopleRenderOptions): R {
    return renderer.render(this, options)
  }
}
