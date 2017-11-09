import { ShowMePage } from './app.po';

describe('show-me App', function() {
  let page: ShowMePage;

  beforeEach(() => {
    page = new ShowMePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
