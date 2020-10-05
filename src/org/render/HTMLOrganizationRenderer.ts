import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Organization, OrganizationRenderer, OrganizationType} from "../Organization";
import {Company} from "../Company";
import {Translator} from "../../lang/Translator";
import {Army} from "../Army";

export class HTMLOrganizationRenderer extends HTMLRenderer implements OrganizationRenderer<HTML> {
  constructor(translator: Translator) {
    super(translator);
  }

  render(org: Organization): HTML {
    return org.name || '<unknown org>'
  }

  renderArmy(army: Army): HTML {
    const type = this.translator.translate(this.translator.message.org.type[OrganizationType.army])
    const name = army.name ? army.name : ''
    return `${type}${type && name ? ' ' : ''}${name}`
  }

  renderCompany(company: Company): HTML {
    const type = this.translator.translate(this.translator.message.org.type[OrganizationType.company])
    const name = company.name ? company.name : ''
    const products = ' de ' + company.products
    return `${name}, ${type} ${products}s`
  }
}
