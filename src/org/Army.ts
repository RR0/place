import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";

export class Army extends Organization {

  constructor(name?: string) {
    super(OrganizationType.army, name);
  }

  render<R>(renderer: OrganizationRenderer<R>): R {
    return renderer.renderArmy(this);
  }
}
