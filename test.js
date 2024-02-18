import puppeteer from 'puppeteer';
import readline from 'readline';

async function Init() {

    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto('https://mobile.southwest.com/check-in');
    return page;
}

async function getUserNum() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your Confirmation # ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }

async function getUserName() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your First Name ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
}

async function getUserLast() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your Last Name ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
}

async function getUserH() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your Hour ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
}

async function getUserM() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question('Enter your Minute ', (answer) => {
        resolve(answer);
        rl.close();
      });
    });
}


async function main(){
    const page = await Init();
    const userNum = await getUserNum();
    const userName = await getUserName();
    const userLast = await getUserLast();
    const h = await getUserH();
    const m = await getUserM();

    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(1) > div > input", userNum);
    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(2) > div > input", userName);
    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(3) > div > input", userLast);

    intervalId = setInterval(() => {
        checkTime(page, userNum, userName, userLast, h, m);
      }, 1000);
    await checkTime(page, userNum, userName, userLast, h, m);
}

async function main2(userNum, userName, userLast, h, m){
    const page = await Init();

    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(1) > div > input", userNum);
    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(2) > div > input", userName);
    await page.type("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div:nth-child(3) > div > input", userLast);

    intervalId = setInterval(() => {
        checkTime(page, userNum, userName, userLast, h, m);
      }, 1000);

    await checkTime(page, userNum, userName, userLast, h, m);
}


let intervalId;

async function checkTime(page, userNum, userName, userLast, h, m) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();


    if ((hours % 12) == h && minutes >= m) {
        clearInterval(intervalId);
        console.log("cleared!")
        await page.click("#appContents > div.check-in > div > div.reservation-retrieval-form > div > form > fieldset > div > div.segment > button");
        main2(userNum, userName, userLast, h, m);
    }
    
}
  


async function run(){
    main();
}

run();
