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

test("ChangeEmail", async () => {
  await page.goto("http://dev.gdxapp.com:3334/stats/profile");
  await page.click("css=.userbar-dropdown-wrapper--hide-mobile >> text=Affiliate Program");
  await page.click("xpath=/html/body/ul/li[2]");
  await page.click("text=Get started");
  await page.click('[name="login0"]');
  await page.type('[name="login0"]', "lalalalaa");
  await page.click(".gdx-text-input");
  await page.type(".gdx-text-input", "a12341234");
  await page.click("text=Log In");
  await page.click("text=Profile");
  await page.click("css=.gdx-button");
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', "test@mail.com");
  await page.click("text=Change email");
  await page.click("text=We have sent a letter to your email address. Please check your inbox and follow the link in the letter.");
  await expect(page).toHaveText('We have sent a letter to your email address. Please check your inbox and follow the link in the letter.');
  await page.click('[for="withdrawal2fa"]');
  await page.click("text=Cancel");
  await qawolf.scroll(page, "html", { x: 0, y: 424 });
  await page.click("text=Copy Login");
  await page.click("text=Copy Api Key");
});