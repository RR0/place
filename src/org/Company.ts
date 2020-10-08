import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";


export class Company extends Organization {

  constructor(longName?: string, shortName?: string, readonly products: string[] = []) {
    super(OrganizationType.company, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderCompany(this, options);
  }
}
