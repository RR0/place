import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Organization, OrganizationRenderer, OrganizationType} from "../Organization";
import {Company} from "../Company";
import {Translator} from "../../lang/Translator";
import {Army} from "../Army";
import {WithOrgMessages} from "../../lang/Messages";


export interface OrganizationNameOptions {
  short: boolean
  long: boolean
}


export enum OrganizationDescriptionOptions {
  none = 'none',
  inline = 'inline',
  tooltip = 'tooltip'
}


export interface OrganizationRenderOptions {
  name: OrganizationNameOptions
  description: OrganizationDescriptionOptions
  types: {
    [OrganizationType.company]: {
      products: boolean
    }
    [OrganizationType.army]: {}
  }
}


export class HTMLOrganizationRenderer extends HTMLRenderer implements OrganizationRenderer<HTML> {

  constructor(translator: Translator<WithOrgMessages>) {
    super(translator);
  }

  render(org: Organization, options: OrganizationRenderOptions): HTML {
    const values: any = {}
    const elements: string[] = []
    const nameOptions = options.name;
    if (nameOptions.short && org.shortName) {
      values.short = org.shortName
      elements.push('short')
    }
    if (nameOptions.long && org.longName) {
      values.long = org.longName
      elements.push('long')
    }
    let name = ''
    if (elements.length > 0) {
      const nameKey = elements.join('_')
      name += this.translator.translate((this.translator.messages.org.name as any)[nameKey], values);
    }
    return name
  }

  renderArmy(army: Army, options: OrganizationRenderOptions): HTML {
    const name = this.render(army, options)
    let type = ''
    if (options.description !== OrganizationDescriptionOptions.none) {
      type = this.translator.translate(this.translator.messages.org.type[OrganizationType.army])
    }
    return `${name}${name && type ? ', ' : ''}${type}`
  }

  renderCompany(company: Company, options: OrganizationRenderOptions): HTML {
    const name = this.render(company, options)
    let type = ''
    if (options.description !== OrganizationDescriptionOptions.none) {
      const products = company.products.join(', ');
      type = this.translator.translate(this.translator.messages.org.type[OrganizationType.company], {products})
    }
    return `${name}${name && type ? ', ' : ''}${type}`
  }
}
