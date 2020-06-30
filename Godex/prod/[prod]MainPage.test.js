const { firefox, chromium } = require('playwright');
const { saveVideo } = require('playwright-video');
const qawolf = require("qawolf");

let browser;
let page2;
let page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page2 = await context.newPage();
  page = await context.newPage();

});

afterAll(async () => {
  await qawolf.stopVideos();
  await capture.stop();
  await browser.close();
});
test("MainPageTest", async () => {
  await page.goto("https://godex.io/");
  await page.click(".push-notification__button");
  await expect(page).toHaveSelector(css='button.download-button--hide-mobile:nth-child(1)');
  await expect(page).toHaveText ('.c-text--fs-24','Customers about us');
  await expect(page).toHaveText ('.c-text--fs-24-t','F.A.Q');
  await expect(page).toHaveText (' h2.c-text--fw-500','What is Godex?');
  await qawolf.scroll(page, "html", { x: 0, y: 1800 });
  await page.click("text=What is Godex?");
  await page.waitForTimeout(1000);
  await page.click("text=What is Godex?");
  await page.click("text=How does Godex work?");
  await page.waitForTimeout(1000);
  await page.click("text=How does Godex work?");
  await page.click("text=Why trust us?");
  await page.waitForTimeout(1000);
  await page.click("text=Why trust us?");
  page.click("css=.c-list__item >> text=How it Works");
  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'How it Works');
  await page.click("css=.c-list__item >> text=About Us");
  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'About Us');
  await page.click("css=.c-list__item >> text=Exchange rate");
  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-row--mt-25-tm > div:nth-child(1) > h1:nth-child(1)', 'Exchange rate');
  await page.click("css=.c-list__item >> text=Dictionary");
  await page.waitForTimeout(2000);
  await expect(page).toHaveText('.c-title', 'Our dictionary');
  await page.click("css=.c-list__item >> text=Home");
  await qawolf.scroll(page, "html", { x: 0, y: 0});
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot/dev/web/main.png' });
});
