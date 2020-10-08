import {Company} from "./Company";
import {Army} from "./Army";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {Entity} from "../Entity";


export interface OrganizationRenderer<R> {

  render(org: Organization, options: OrganizationRenderOptions): R

  renderCompany(company: Company, options: OrganizationRenderOptions): R;

  renderArmy(army: Army, options: OrganizationRenderOptions): R;
}


export enum OrganizationType {
  company = 'company',
  army = 'army',
}


export abstract class Organization extends Entity {

  protected constructor(readonly type: OrganizationType, readonly longName?: string, readonly shortName?: string) {
    super()
  }

  abstract render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R
}
