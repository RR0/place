import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";


export class School extends Organization {

  constructor(longName?: string, shortName?: string) {
    super(OrganizationType.school, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderSchool(this, options);
  }
}
