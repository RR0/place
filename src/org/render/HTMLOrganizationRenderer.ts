import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Organization, OrganizationRenderer} from "../Organization";

export class HTMLOrganizationRenderer extends HTMLRenderer implements OrganizationRenderer<HTML> {

  render(org: Organization): HTML {
    return org.name;
  }
}
