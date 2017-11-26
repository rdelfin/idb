/**
 * Integration tests for frontend.
 */
'use strict';

const async = require('async');
const chai = require('chai');
const {exec} = require('child_process');
const selenium = require('selenium-webdriver');

chai.use(require('chai-as-promised'));
const {Builder, By, Key, until} = selenium;
const {expect} = chai;

// Spawn an instance of our server, capturing the domain name it's running on
let server;
let domainName;

before('spawn server', async () => {
  await new Promise((resolve, reject) => {
    server = exec('npm run start');
    let output = '';
    server.stderr.on('data', callback);

    function callback(data) {
      output += data;
      const matches = output.match(/^ \* Running on (http:\/\/[\w\.]+:\d{1,5})/);
      if (matches) {
        domainName = matches[1];
        server.stderr.removeListener('data', callback);
        resolve();
      }
    }
  });
});

after('kill server', () => {
  server.kill();
});

describe('the homepage', () => {
  let driver;

  before('spawn driver', async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after('kill driver', async () => {
    await driver && driver.quit();
  });

  before('navigate', async () => {
    await driver.get(domainName);
  });

  it('renders', async () => {
    await driver.wait(until.titleIs('PhoneDB'), 1000);
    await driver.wait(until.elementLocated(By.css('[data-reactroot]')), 1000);
    await driver.wait(until.elementLocated(By.partialLinkText('Models')), 2000);
  });
});

// End setup code

describe('a list page', () => {
  let driver;

  before('spawn driver', async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after('kill driver', async () => {
    await driver && driver.quit();
  });

  before('navigate', async () => {
    await driver.get(`${domainName}/#/phones`);
  });

  it('renders', async () => {
    const h1 = await driver.wait(until.elementLocated(By.css('h1')), 1000);
    expect(h1.getText()).to.eventually.contain('Phones');
  });

  it('can paginate', async () => {
    const list = await driver.wait(until.elementLocated(By.name('listpagelist')), 1000);
    let title = await getFirstListItemTitle();

    const next = await driver.findElement(By.name('pagination_next'));
    await next.click();
    let newTitle = await getFirstListItemTitle();
    expect(newTitle).to.not.equal(title);
    title = newTitle;

    const last = await driver.findElement(By.name('pagination_last'));
    await last.click();
    newTitle = await getFirstListItemTitle();
    expect(newTitle).to.not.equal(title);
    title = newTitle;

    const prev = await driver.findElement(By.name('pagination_prev'));
    await prev.click();
    newTitle = await getFirstListItemTitle();
    expect(newTitle).to.not.equal(title);
    title = newTitle;

    const first = await driver.findElement(By.name('pagination_first'));
    await first.click();
    newTitle = await getFirstListItemTitle();
    expect(newTitle).to.not.equal(title);
  }).timeout(60000);

  it('can sort', async () => {
    const sortby = await driver.wait(until.elementLocated(By.name('sortby')), 1000);
    const sorters = await sortby.findElements(By.css('button'));
    let title = await getFirstListItemTitle();
    async.each(sorters, async sorter => {
      await sorter.click();
      let newTitle = await getFirstListItemTitle();
      expect(newTitle).to.not.equal(title);
      title = newTitle;
    });
  });

  async function getFirstListItemTitle() {
    const item = await driver.wait(until.elementLocated(By.css('[name=listpagelist] > a')), 60000);
    const titleElem = await item.findElement(By.css('div'));
    return await titleElem.getText();
  }
});

describe('a table page', () => {
  let driver;

  before('spawn driver', async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after('kill driver', async () => {
    await driver && driver.quit();
  });

  before('navigate', async () => {
    await driver.get(`${domainName}/#/phones/958`);
  });

  it('renders', async () => {
    const h1 = await driver.wait(until.elementLocated(By.css('h1')), 60000);
    expect(h1.getText()).to.eventually.contain('Apple Newton');
  }).timeout(60000);
});
