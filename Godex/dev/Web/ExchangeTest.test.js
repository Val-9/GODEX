const { firefox, chromium } = require('playwright');
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
  await browser.close();
});

test("ExchangeTest", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
  await page.click('[placeholder="Type amount"]');
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.type('[placeholder="Type amount"]', "2");
  await page.click(".c-btn--regular");
  await expect(page).toHaveText('.c-title', 'Starting')
  await page.click('[placeholder="Enter the Ethereum address"]');
  await page.type('[placeholder="Enter the Ethereum address"]', "0x431c053281dee679cf597cad21eb8ea6b2e58f91");
  await page.screenshot({ path: 'screenshot/dev/web/status-starting.png' });
  await page.click(".c-btn--regular");
  await page.click(".c-btn");

  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'Waiting for Deposit');
  await page.screenshot({ path: 'screenshot/dev/web/status-waiting.png' });

  await page2.goto("http://dev.gdxapp.com:8082/admin/transaction");
  await page2.click("#email");
  await page2.type("#email", "vasilyev.valik@gmail.com");
  await page2.type("#password", "a12341234");
  await page2.click('[value="Login"]');

  await page2.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
  await page2.selectOption("#status", "confirmation");
  await page2.click("text=Update");

  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'Confirmation');
  await page.screenshot({ path: 'screenshot/dev/web/status-confirmation.png' });

  await page2.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
  await page2.selectOption("#status", "exchanging");
  await page2.click("text=Update");
  await page2.click('[name="optradio"]');
  await page2.click("text=Save");

  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'Exchanging');
  await page.screenshot({ path: 'screenshot/dev/web/status-exchanging.png' });

  await page2.click('#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i');
  await page2.selectOption("#status", "success");
  await page2.click("text=Update");

  await page.waitForTimeout(3000);
  await expect(page).toHaveText('.c-title', 'Completed');
  await page.click('.gdx-modal__header-close-button-image')
  await page.screenshot({ path: 'screenshot/dev/web/status-completed.png' });

});

