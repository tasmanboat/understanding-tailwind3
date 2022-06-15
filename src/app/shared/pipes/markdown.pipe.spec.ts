import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new MarkdownPipe();

  it('create an instance', () => {
    const pipe = new MarkdownPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "**bold**" to <strong> HTML element', () => {
    expect(pipe.transform('**bold**')).toBe('<p><strong>bold</strong></p>\n');
  });

  it('transforms "[title](https://www.example.com)" to <a> HTML element', () => {
    expect(pipe.transform('this [title](https://www.example.com) is there')).toBe('<p>this <a target="_blank" class="link" rel="noreferrer noopener nofollow" href="https://www.example.com">title</a> is there</p>\n');
  });

});
