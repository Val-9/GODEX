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

test("ExchangeCoinWithPaymentID", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
  await page.click('[value="0"]');
  await page.press('[value="0"]', "Backspace");
  await page.click("xpath=//*[@id='__layout']/div/div[3]/div/div/div/div[4]/div/div[3]/div/div/div[2]/div[1]");
  await page.type("xpath=//*[@id='__layout']/div/div[3]/div/div/div/div[4]/div/div[3]/div/div/div[2]/div[2]/input", "xmr");
  await page.click("//*[@id='__layout']/div/div[3]/div/div/div/div[4]/div/div[3]/div/div/div[2]/div[2]/span/span[2]/span");
  await page.click(".c-btn--regular");
  await page.click('[placeholder="Enter the Monero address"]');
  await page.type('[placeholder="Enter the Monero address"]', "89wgf8EERnS3HJtDzb4t1m3EjbkWkGSjaTv35txzgxUBKnZyvmRRnr5UGcBs1nqMLyFZAcYb5C9A7LpL2aQoGxks8Mbfimi");
  await page.click('[placeholder="Payment ID"]');
  await page.type('[placeholder="Payment ID"]', "Test Payment ID");
});