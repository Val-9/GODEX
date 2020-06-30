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

test("godex", async () => {
  await page.goto("https://godex.io/dictionary");
  await page.click("css=.dictionary__letters-wrapper >> text=C");
  await page.click("css=.dictionary__letters-wrapper >> text=E");
  await page.click("css=.dictionary__letters-wrapper >> text=G");
});