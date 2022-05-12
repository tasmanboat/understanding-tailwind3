import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

// To parse markdown to HTML
@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
      const localLink = href?.startsWith(`${location.protocol}//${location.hostname}`);
      const html = linkRenderer.call(renderer, href, title, text);
      return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
    };
    if (value?.length > 0) {
      return marked(value, { renderer: renderer });
    }
    return value;
  }

}
