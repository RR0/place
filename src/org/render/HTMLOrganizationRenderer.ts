import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Organization, OrganizationRenderer, OrganizationType} from "../Organization";
import {Company} from "../Company";
import {Translator} from "../../lang/Translator";
import {Army} from "../Army";
import {PlaceRenderer} from "../../place/Place";
import {WithOrgMessages} from "../OrgMessages";
import {School} from "../School";
import {ObjectUtils} from "../../util/ObjectUtils";


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
  origin: boolean
  types: {
    [OrganizationType.company]: {
      products: boolean,
    }
    [OrganizationType.army]: {}
  }
}


export class HTMLOrganizationRenderer extends HTMLRenderer implements OrganizationRenderer<HTML> {

  constructor(translator: Translator<WithOrgMessages>, private placeRenderer: PlaceRenderer<HTML>) {
    super(translator);
  }

  render(org: Organization, options: OrganizationRenderOptions): HTML {
    let name = ''
    const values = this.getValues(org, options);
    const keys = Object.keys(values);
    if (keys.length > 0) {
      const nameKey = keys.join('_')
      name += this.translator.translate((this.translator.messages.org as any)[nameKey], values);
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
    let name = ''
    const values = this.getValues(company, options);
    if (options.description !== OrganizationDescriptionOptions.none) {
      values.products = company.products.map(p => Object.values(p)[0]).join(', ')
    }
    const keys = Object.keys(values)
    if (keys.length > 0) {
      const key = this.translator.compoundKey(keys.concat('company'))
      name += this.translator.translate((this.translator.messages.org as any)[key], values)
    }
    return name
  }

  renderSchool(school: School, options: OrganizationRenderOptions): HTML {
    let name = ''
    const values = this.getValues(school, options);
    const keys = Object.keys(values)
    const key = this.translator.compoundKey(keys.concat('school'))
    name += this.translator.translateKey(this.translator.messages.org, key, values)
    return name
  }

  private getValues(org: Organization, options: OrganizationRenderOptions): { [key: string]: any } {
    const values: any = {}
    const nameOptions = options.name;
    if (nameOptions.short && ObjectUtils.isSet(org.shortName)) {
      values.short = this.translator.translateKey(this.translator.messages.dict, org.shortName!)
    }
    if (nameOptions.long && ObjectUtils.isSet(org.longName)) {
      values.long = this.translator.translateKey(this.translator.messages.dict, org.longName!)
    }
    if (options.origin) {
      const firstCountry = org.firstCountry
      if (ObjectUtils.isSet(firstCountry)) {
        values.nationality = firstCountry!.renderNationality(this.placeRenderer, this.translator.getGender(this.translator.messages.dict.company))
      }
    }
    return values;
  }
}
