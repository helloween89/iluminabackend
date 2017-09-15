import { IluminaAppPage } from './app.po';

describe('ilumina-app App', function() {
  let page: IluminaAppPage;

  beforeEach(() => {
    page = new IluminaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
