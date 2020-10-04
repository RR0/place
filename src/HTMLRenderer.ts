import {Renderer} from "./Renderer";

export type HTML = string

export class HTMLRenderer extends Renderer {

  protected paragraph(content: HTML): HTML {
    return this.tag('p', content);
  }

  private tag(tag: string, content: HTML): HTML {
    return `<${tag}>${content}</${tag}>`
  }
}
