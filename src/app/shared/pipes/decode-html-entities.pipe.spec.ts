import { DecodeHTMLEntitiesPipe } from './decode-html-entities.pipe';

describe('DecodeHTMLEntitiesPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new DecodeHTMLEntitiesPipe();

  it('create an instance', () => {
    const pipe = new DecodeHTMLEntitiesPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "&lt; &gt;" to "< >"', () => {
    expect(pipe.transform("let's see a &lt;tag&gt;")).toBe("let's see a <tag>");
  });

});
