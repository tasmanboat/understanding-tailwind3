import { DateAgoPipe } from './date-ago.pipe';

describe('DateAgoPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new DateAgoPipe();

  it('create an instance', () => {
    const pipe = new DateAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a timestamp to "x seconds ago"', () => {
    let dateInNumber = Date.now();
    dateInNumber = dateInNumber - 38000;
    expect(pipe.transform(dateInNumber)).toBe('38 seconds ago');
  });

  it('transforms a timestamp to "2 minutes ago"', () => {
    let dateInNumber = Date.now();
    dateInNumber = dateInNumber - 120000;
    expect(pipe.transform(dateInNumber)).toBe('2 minutes ago');
  });

});
