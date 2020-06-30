const qawolf = require("qawolf");
const {chromium } = require("playwright");

let browser;
let page;

  beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("AppModalTest", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
  await page.focus("css= button.download-button--hide-mobile:nth-child(1)");
  await page.screenshot({ path: 'screenshot/dev/web/focus1.png' });
  await page.focus("css= button.download-button--hide-mobile:nth-child(2)");
  await page.screenshot({ path: 'screenshot/dev/web/focus2.png' });
  await page.click("css= button.download-button--hide-mobile:nth-child(1)");
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'The Godex application will be available very soon. Leave your email so we can send you a download link when app is released.');
  await page.click('[placeholder="Email"]');
  await page.type('[placeholder="Email"]', "test@mail.google");
  await page.click("text=Submit");

  await page.waitForTimeout(1000);
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'We try to be the best for you. You will receive a download link as soon as the application is available.');
  await expect(page).toHaveSelector('.gdx-default-btn-success');
  await page.click('.gdx-modal__header-close-button-image');

  await page.click("css= button.download-button--hide-mobile:nth-child(2)");
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'The Godex application will be available very soon. Leave your email so we can send you a download link when app is released.');
  await page.click('[placeholder="Email"]');
  await page.type('[placeholder="Email"]', "test@mail.apple");
  await page.click("text=Submit");

  await page.waitForTimeout(1000);
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'We try to be the best for you. You will receive a download link as soon as the application is available.');
  await expect(page).toHaveSelector('.gdx-default-btn-success');
  await page.click('.gdx-modal__header-close-button-image');

});