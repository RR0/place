import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {WordMessage} from "../lang/Dictionary";


export class Company extends Organization {

  constructor(longName?: string, shortName?: string, readonly products: WordMessage[] = []) {
    super(OrganizationType.company, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderCompany(this, options);
  }
}
