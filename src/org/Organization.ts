import {Company} from "./Company";
import {Army} from "./Army";
import {OrganizationRenderOptions} from "./render/HTMLOrganizationRenderer";
import {Timeline} from "../time/Timeline";
import {Country} from "../place/Country";


export interface OrganizationRenderer<R> {

  render(org: Organization, options: OrganizationRenderOptions): R

  renderCompany(company: Company, options: OrganizationRenderOptions): R;

  renderArmy(army: Army, options: OrganizationRenderOptions): R;
}


export enum OrganizationType {
  company = 'company',
  army = 'army',
}


export abstract class Organization {

  readonly events = new Timeline()

  protected constructor(readonly type: OrganizationType, readonly longName?: string, readonly shortName?: string) {
  }

  get firstCountry(): Country | undefined {
    return this.events.get(0)?.where?.country
  }

  abstract render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R
}
