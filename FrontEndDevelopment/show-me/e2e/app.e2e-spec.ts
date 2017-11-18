import { ShowMePage } from './app.po';

describe('show-me App', () => {
  let page: ShowMePage;

  beforeEach(() => {
    page = new ShowMePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
