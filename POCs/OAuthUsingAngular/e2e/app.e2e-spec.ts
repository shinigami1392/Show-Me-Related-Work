import { EcartPage } from './app.po';

describe('ecart App', function() {
  let page: EcartPage;

  beforeEach(() => {
    page = new EcartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
