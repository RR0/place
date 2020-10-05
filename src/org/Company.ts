import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";

export class Company extends Organization {

  constructor(name?: string, readonly products?: string[]) {
    super(OrganizationType.company, name);
  }

  render<R>(renderer: OrganizationRenderer<R>): R {
    return renderer.renderCompany(this);
  }
}
