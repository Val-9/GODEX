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

test("ExchangeIphone8", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
  await page.click ("xpath= //*[@id='__layout']/div/div[5]/div[2]/button");
  await page.click('[placeholder="Type amount"]');
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.type('[placeholder="Type amount"]', "2");
  await page.click(".c-btn--regular");
  await expect(page).toHaveText('.c-title', 'Starting');
  await page.screenshot({ path: 'screenshot/iPhone8/status-starting.png' });

  await page.click('[placeholder="Enter the Ethereum address"]');
  await page.type('[placeholder="Enter the Ethereum address"]', "0x431c053281dee679cf597cad21eb8ea6b2e58f91");
  await page.click(".c-btn--regular");
  await page.click(".c-btn");

  await page.waitForTimeout(4000);
  await expect(page).toHaveText('.c-title', 'Waiting for Deposit');
   await page.screenshot({ path: 'screenshot/iPhone8/status-wait.png' });

  await page2.goto("http://dev.gdxapp.com:8082/admin/transaction");
  await page2.click("#email");
  await page2.type("#email", "vasilyev.valik@gmail.com");
  await page2.type("#password", "a12341234");
  await page2.click('[value="Login"]');

  await page2.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
  await page2.selectOption("#status", "confirmation");
  await page2.click("text=Update");

  await page.waitForTimeout(4000);
  await expect(page).toHaveText('.c-title', 'Confirmation');
  await page.screenshot({ path: 'screenshot/iPhone8/status-confirmation.png' });

  await page2.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
  await page2.selectOption("#status", "exchanging");
  await page2.click("text=Update");
  await page2.click('[name="optradio"]');
  await page2.click("text=Save");

  await page.waitForTimeout(4000);
  await expect(page).toHaveText('.c-title', 'Exchanging');
   await page.screenshot({ path: 'screenshot/iPhone8/status-exchange.png' });

  await page2.click('#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i');
  await page2.selectOption("#status", "success");
  await page2.click("text=Update");

  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'screenshot/iPhone8/status-completed-popup.png' });
  await page.click('.gdx-modal__header-close-button-image')
  await expect(page).toHaveText('.c-title', 'Completed');
  await page.screenshot({ path: 'screenshot/iPhone8/status-completed.png' });
});
//*[@id="__layout"]/div/div[4]/div/div[3]/div[1]/div/div/div/div[1]/div[2]/div/img