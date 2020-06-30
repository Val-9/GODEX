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

test("DictionarySearchLetterDev", async () => {
     await page.goto("http://dev.gdxapp.com:3334/");
     expect(await page.title()).toEqual("Godex.io");
     await page.click("xpath=//*[@id='__layout']/div/div[4]/footer/div/div[2]/div[1]/ul/li[6]/a");
     await expect(page).toHaveText (".c-title", "Our dictionary");
     await page.screenshot({ path: 'screenshot/dev/web/page-dictionary.png' });
     await page.click("css=.dictionary__letters-wrapper >> text=K");
     await expect(page).toHaveText ("KYC");
     await page.click("css=.dictionary__letters-wrapper >> text=L");
     await expect(page).toHaveText ("Lambo");
     await page.click("css=.dictionary__letters-wrapper >> text=M");
     await page.click("css=.dictionary__letters-wrapper >> text=L");
       await page.click("css=.dictionary__letters-wrapper >> text=N");
        await page.click("css=.dictionary__letters-wrapper >> text=O");
         await page.click("css=.dictionary__letters-wrapper >> text=P");
          await page.click("css=.dictionary__letters-wrapper >> text=R");
           await page.click("css=.dictionary__letters-wrapper >> text=S");
            await page.click("css=.dictionary__letters-wrapper >> text=T");
             await page.click("css=.dictionary__letters-wrapper >> text=U");
              await page.click("css=.dictionary__letters-wrapper >> text=0-9");
     await page.click("text=All");
     await page.type('[placeholder="Which word are you searching?"]', "lallalalalalalal");
     await page.click(".el-button");
     await page.click(".c-section--black .c-section__container");
     await page.waitForTimeout(2000);
     await page.waitForSelector ("xpath=//*[@id='__layout']/div/div[3]/div[2]/div/div/div[4]/div[1]");
     await expect(page).toHaveText (".dictionary-no-data" , "No results for your request");
   });