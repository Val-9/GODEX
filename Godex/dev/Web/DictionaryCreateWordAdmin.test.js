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

test("DictionaryCreateWordAdmin", async () => {
  await page.goto("http://dev.gdxapp.com:8082/admin/glossary");
  await page.click("#email");
  await page.type("#email", "vasilyev.valik@gmail.com");
  await page.press("#email", "Tab");
  await page.type("#password", "a12341234");
  await page.click('[value="Login"]');
  await page.click("text=Create");
  await page.click("#word");
  await page.type("#word", "Test Name");
  await page.click("#preview");
  await page.type("#preview", "Short describe");
  await page.click('[aria-label="Rich Text Editor, main"] p');
  await page.type('[aria-label="Rich Text Editor, main"]', "Full describe");
  await page.type('[aria-label="Rich Text Editor, main"]', "");
  await page.click('[value="Create"]');
  await page.goto("http://dev.gdxapp.com:3334/dictionary");
  await page.click('[placeholder="Which word are you searching?"]');
  await page.type('[placeholder="Which word are you searching?"]', "test name");
  await page.click(".el-button");
  await page.click(".c-section--black .c-section__container");
  await page.click(".c-section--black .c-section__container");
  await page.click("text=Short describe");
  await expect(page).toHaveText ("Test Name");
  await expect(page).toHaveText ("Short describe");
});