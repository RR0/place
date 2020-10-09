import {Company} from "./Company";
import {Army} from "./Army";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {Entity, Gender} from "../Entity";


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

  protected constructor(readonly type: OrganizationType, gender: Gender, readonly longName?: string, readonly shortName?: string) {
    super(gender)
  }

  abstract render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R
}
