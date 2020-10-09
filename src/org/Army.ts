import {Organization, OrganizationRenderer, OrganizationType} from "./Organization";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {Gender} from "../Entity";

export class Army extends Organization {

  constructor(gender: Gender, longName?: string, shortName?: string) {
    super(OrganizationType.army, gender, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderArmy(this, options);
  }
}
