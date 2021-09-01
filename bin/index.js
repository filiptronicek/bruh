#!/usr/bin/env node

const isOnline = require("is-online");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const clc = require("cli-color");

const isAvailable = require("./src/availible");

/* Network requests */

const fetch = require("node-fetch");

const cliArguments = process.argv;

const websites = [
  "google.com",
  "github.com",
  "wikipedia.org",
];

const positiveStatusCodes = [200, 201, 204, 301, 302, 303, 304, 308];

function checkWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`).then(
    (response) => response.status
  );
  info.then((status) => {
    const success = positiveStatusCodes.includes(status);
    console.log(
      `${success ? "✅" : "❌"} ${clc.red(name)} is ${
        success ? "online" : "offline"
      }`
    );
  });

  info.catch((_error) => {
    console.log(`❌ cannot access ${clc.red(name)}`);
  });
}

const title = cliArguments.includes("lmao") ? "BRUH LMAO" : "BRUH";

clear();
console.log(chalk.red(figlet.textSync(title, { horizontalLayout: "full" })));

const customSite = cliArguments[2];

if (customSite) {
  if (
    customSite.match(
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/
    )
  ) {
    if (isAvailable(customSite)) {
      console.log(
        `🔴 ${clc.yellow(
          customSite
        )} isn't registered or doesn't have proper DNS config.`
      );
    } else {
      websites.push(customSite);
    }
  } else {
    console.error(`🔴 ${clc.yellow(customSite)} doesn't look like a domain`);
  }
}

(async () => {
  const online = await isOnline();

  if (online) {
    websites.sort().forEach((web) => {
      checkWeb(web);
    });
  } else {
    console.log("❌ you are offline");
  }
})();
