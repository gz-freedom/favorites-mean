import { MyFavoritePage } from './app.po';

describe('my-favorite App', () => {
  let page: MyFavoritePage;

  beforeEach(() => {
    page = new MyFavoritePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
