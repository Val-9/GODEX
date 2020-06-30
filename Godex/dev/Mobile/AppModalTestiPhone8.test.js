const { devices } = require("playwright");
const qawolf = require("qawolf");
const device = devices["iPhone 8"];

let browser;
let page;
let page2;

  beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext({ ...device });
  await qawolf.register(context);
  page2 = await context.newPage();
  page = await context.newPage();
});

  afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("AppModalTest", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
  await page.click("css= div.c-row--mt-20:nth-child(2) > button:nth-child(1)");
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'The Godex application will be available very soon. Leave your email so we can send you a download link when app is released.');
  await page.click('[placeholder="Email"]');
  await page.type('[placeholder="Email"]', "test@mail.google");
  await page.click("text=Submit");

  await page.waitForTimeout(2000);
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'We try to be the best for you. You will receive a download link as soon as the application is available.');
  await expect(page).toHaveSelector('.gdx-default-btn-success');
  await page.click('.gdx-modal__header-close-button-image');

  await page.click("css= div.c-row--mt-20:nth-child(2) > button:nth-child(2)");
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'The Godex application will be available very soon. Leave your email so we can send you a download link when app is released.');
  await page.click('[placeholder="Email"]');
  await page.type('[placeholder="Email"]', "test@mail.apple");
  await page.click("text=Submit");

  await page.waitForTimeout(2000);
  await expect(page).toHaveText('.gdx-modal__body > div:nth-child(1) > div:nth-child(1)',
   'We try to be the best for you. You will receive a download link as soon as the application is available.');
  await expect(page).toHaveSelector('.gdx-default-btn-success');
  await page.click('.gdx-modal__header-close-button-image');
});