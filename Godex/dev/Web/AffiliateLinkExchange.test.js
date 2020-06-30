const { devices  } = require('playwright');
const qawolf = require("qawolf");


let browser;
let page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("ExchangeTest", async () => {
  await page.goto("http://dev.gdxapp.com:3334/?aff_id=T2ZkqQOEI4yHTpuv&utm_source=affiliate&utm_medium=Test link&utm_campaign=T2ZkqQOEI4yHTpuv");
  await page.click('[placeholder="Type amount"]');
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.press('[placeholder="Type amount"]', "Backspace");
  await page.type('[placeholder="Type amount"]', "2");
  await page.click(".c-btn--regular");
  await page.click('[placeholder="Enter the Ethereum address"]');
  await page.type('[placeholder="Enter the Ethereum address"]', "0x431c053281dee679cf597cad21eb8ea6b2e58f91");
  await page.click(".c-btn--regular");
});
  test("ChangeStatus", async () => {
    await page.goto("http://dev.gdxapp.com:8082/admin/transaction");
    await page.click("#email");
    await page.type("#email", "vasilyev.valik@gmail.com");
    await page.type("#password", "a12341234");
    await page.click('[value="Login"]');
    await page.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
    await page.selectOption("#status", "confirmation");
    await page.click("text=Update");
    await page.click("#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i");
    await page.selectOption("#status", "exchanging");
    await page.click("text=Update");
    await page.click('[name="optradio"]');
    await page.click("text=Save");
    await page.click('#transactions-table > tbody > tr:nth-child(1) > td:nth-child(16) > a.btn.btn-xs.btn-info > i');
    await page.selectOption("#status", "success");
    await page.click("text=Update");
});