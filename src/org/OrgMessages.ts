import {OrganizationType} from "./Organization";


export interface OrgMessages {
  short: string
  long: string
  short_long: string
  company_products: string
  company_nationality: string
  company_nationality_products: string
  [OrganizationType.army]: string
}


export interface WithOrgMessages {
  org: OrgMessages
}
