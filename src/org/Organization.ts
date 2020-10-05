import {Company} from "./Company";
import {Army} from "./Army";

export interface OrganizationRenderer<R> {

  render(org: Organization): R

  renderCompany(company: Company): R;

  renderArmy(army: Army): R;
}


export enum OrganizationType {
  company = 'company',
  army = 'army',
}


export abstract class Organization {

  protected constructor(readonly type: OrganizationType, readonly name?: string) {
  }

  abstract render<R>(renderer: OrganizationRenderer<R>): R
}
