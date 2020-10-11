import {Renderer} from "./Renderer";

export type HTML = string

export class HTMLRenderer<M = any> extends Renderer<M> {

  protected paragraph(content: HTML): HTML {
    return this.tag('p', content);
  }

  protected heading(content: HTML, level: number): HTML {
    return this.tag(`h${level}`, content);
  }

  protected h1(content: HTML): HTML {
    return this.heading(content, 1);
  }

  private tag(tag: string, content: HTML): HTML {
    return `<${tag}>${content}</${tag}>`
  }
}
