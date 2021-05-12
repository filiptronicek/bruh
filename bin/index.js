#!/usr/bin/env node

const isOnline = require('is-online');

const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const clc = require("cli-color");

const isAvailable = require('./src/availible');

/* Network requests */

const fetch = require("node-fetch");

const cliArguments = process.argv;

const websites = [
    "google.com",
    "github.com",
    "gitlab.com",
    "dev.to",
];

const positiveStatusCodes = [
    200,
    201,
    204,
    301,
    302,
    303,
    304,
    308
];

function CheckWeb(name) {
    const info = fetch(`https://isitup.org/${name}.json`).then(response => response.json());

    info.then((result) => {
        if (positiveStatusCodes.includes(result.response_code)) {
            if (cliArguments[0] !== name) {
                console.log(`✅  ${clc.red(name)
                    } is up and running`);
            } else {
                console.log(`✅  ${clc.yellow(name)
                    } is up and running`);
            }
        } else {
            console.log(`❌  ${name} is down`);
        }
    });

    info.then(() => {
        fetch(`http://${name}`).then(() => {
            // console.log(response.status);
        }).catch(_error => {
            console.log(`${clc.red(name)
                } is inaccessible`);
        });
    });

    info.catch((_error) => {
        console.log(`❌ cannot access ${clc.red(name)
            }`);
    });
}

const title = cliArguments.includes("lmao") ? "BRUH LMAO" : "BRUH";

clear();
console.log(chalk.red(figlet.textSync(title, { horizontalLayout: 'full' })));

const customSite = cliArguments[2];

if (customSite) {
    if (customSite.match(/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/)) {
        if (!isAvailable(customSite)) {
            console.log(`🔴  ${clc.yellow(customSite)} isn't registered or doesn't have proper DNS config.`);
        } else {
            websites.push(customSite);
        }
    } else {
        console.error(`🔴  ${clc.yellow(customSite)} doesn't look like a domain`);
    }
}

(async () => {
    const online = await isOnline();

    if (online) {
        websites.sort().forEach(web => {
            CheckWeb(web);
        });
    } else {
        console.log("❌ you are offline")
    }

})();