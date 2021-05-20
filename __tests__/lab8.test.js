/* eslint-disable */
describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toMatch(/#entry1/);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”

    const title = await page.$('h1');
    const actTitle = await page.evaluate(title => title.textContent, title);
    expect(actTitle).toBe("Entry 1");

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    const entry = await page.$("entry-page");
    const evalEntry = await page.evaluate(entry => entry.entry, entry);
    expect(evalEntry).toEqual(
      {
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      }
    );

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.$('body');
    const evalBody = await page.evaluate(body => body.className, body);
    expect(evalBody).toBe('single-entry');


  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img[alt="settings"]');
    expect(page.url()).toBe('http://127.0.0.1:5500/#settings');

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$('h1');
    const evalHeader = await page.evaluate(header => header.textContent, header);
    expect(evalHeader).toBe("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.$('body')
    const evalBody = await page.evaluate(body => body.className, body);
    expect(evalBody).toBe('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toMatch(/#entry1/);

  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');

  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const header = await page.$('h1');
    const evalHeader = await page.evaluate(header => header.textContent, header);
    expect(evalHeader).toBe('Journal Entries');

  });

  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('test13: On the home page the <body> element should not have any class attribute', async () => {
    const body = await page.$('body');
    const evalBody = await page.evaluate(body => body.className, body);
    expect(evalBody).toBe('');

  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.click('journal-entry + journal-entry');
    expect(page.url()).toMatch(/#entry2/);

  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    const title = await page.$('h1');
    const evalTitle = await page.evaluate(title => title.textContent, title);
    expect(evalTitle).toBe('Entry 2');

  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry

  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const entry = await page.$("entry-page");
    const evalEntry = await page.evaluate(entry => entry.entry, entry);
    expect(evalEntry).toEqual(
      {
        title: "Run, Forrest! Run!",
        date: "4/26/2021",
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
          alt: "forrest running"
        }
      }
    );

  }, 10000);
 // test 17: verify url correct when clicking on third entry after going back
 it('test17: Verify the url is correct when clicking on the third entry', async () => {
   await page.goBack();
    await page.click('journal-entry + journal-entry + journal-entry');
    expect(page.url()).toMatch(/#entry3/);
  });
  // test 18: verify that url is correct when going back and then to the third entry
  it('Test18: verify that url is correct when going back and then to the third entry', async () => {
    const title = await page.$('h1');
    const evalTitle = await page.evaluate(title => title.textContent, title);
    expect(evalTitle).toBe('Entry 3');

  });

  // create your own test 19
  it('test19: Verify the entry page contents is correct when clicking on the third entry', async () => {
    const entry = await page.$("entry-page");
    const evalEntry = await page.evaluate(entry => entry.entry, entry);
    expect(evalEntry).toEqual(
      {
        title: "Ogres are like onions",
        date: "4/27/2021",
        content: "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.",
        image: {
          src: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg",
          alt: "shrek and donkey looking confused"
        }
      }
    );

  }, 10000);
  // create your own test 20
 it('test20: Verify the url is correct when clicking on the fourth entry', async () => {
   await page.goBack();
    await page.click('journal-entry + journal-entry + journal-entry + journal-entry');
    expect(page.url()).toMatch(/#entry4/);
  });

});
