import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {WordMessage} from "../lang/Dictionary";
import {Gender} from "../Entity";


export class Company extends Organization {

  constructor(gender: Gender, longName?: string, shortName?: string, readonly products: WordMessage[] = []) {
    super(OrganizationType.company, gender, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderCompany(this, options);
  }
}
