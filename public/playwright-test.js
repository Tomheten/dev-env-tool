const { test, expect, chromium } = require('@playwright/test');
// const { chromium } = require('playwright-chromium');

const fs = require('fs');
const path = require('path');

const run = async () => {
  const browser = await chromium.launch({
    executablePath: './../_chrome-win/chrome.exe',
    headless: false,
    //devtools: false,
    timeout: 30000,
    // userDataDir: __dirname + '/user_data', // args: ['--enable-logging',' --v=0']
    args: ['--allow-file-access-from-files, --disable-web-security']
    //channel: 'chrome',
  });

  const page = await browser.newPage();
};

run();


console.log('-------------');
