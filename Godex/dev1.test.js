const { devices } = require("playwright");
const qawolf = require("qawolf");
const device = devices["iPhone 8"];


let browser;
let page = device;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext({userAgent:
                                                 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
                                               viewport: {
                                                 width: 300,
                                                 height: 512,
                                                 deviceScaleFactor: 1,
                                                 isMobile: true,
                                               },
                                             });
  await qawolf.register(context);
  page = await context.newPage({ ...device });

});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("dev1", async () => {
  await page.goto("http://dev.gdxapp.com:3334/");
    await page.click('[placeholder="Type amount"]');
    await page.press('[placeholder="Type amount"]', "Backspace");
    await page.press('[placeholder="Type amount"]', "Backspace");
    await page.type('[placeholder="Type amount"]', "2");
    await page.click(".c-btn--regular");
    await page.click('[placeholder="Enter the Ethereum address"]');
    await page.type('[placeholder="Enter the Ethereum address"]', "0x431c053281dee679cf597cad21eb8ea6b2e58f91");
    await page.click(".c-btn--regular");
    await expect(page).toHaveSelector("xpath=//*[@id='__layout']/div/div[4]/div/div[3]/div/div/div[1]/h2", "Confirmation");
    await expect(page).toHaveText("Confirmation");
    await expect(page).toHaveSelector("xpath=//*[@id='__layout']/div/div[4]/div/div[3]/div/div/div[1]/h2", "Exchanging");
    await expect(page).toHaveText("Exchanging");
    await page.click(".gdx-modal__header-close-button");
    await page.click(".c-row--flex ul", "Confirmation");
    await page.click(".c-title--capitalize");
    await page.click(".c-section--black .c-section__container");
    await page.click(".c-title--capitalize");
    await page.click("html");
    await expect(page).toHaveSelector('#__layout > div > div.processing-layout > div > div:nth-child(3) > div > div > div:nth-child(1) > h2', 'Exchange');
    await expect(page).toHaveText("Exchange");
});