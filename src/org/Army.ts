import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";


export class Army extends Organization {

  constructor(longName?: string, shortName?: string) {
    super(OrganizationType.army, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderArmy(this, options);
  }
}
