export interface OrganizationRenderer<R> {
  render(org: Organization): R
}


export enum OrganizationType {
  factory = 'factory',
}


export class Organization {

  constructor(readonly type: OrganizationType, readonly name?: string) {
  }
}
