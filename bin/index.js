#!/usr/bin/env node

const fetch = require("node-fetch");
const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const clc = require("cli-color");

const cliArguments = process.argv.slice(2);

const websites = [
    "google.com",
    "github.com",
    "gitlab.com",
    "dev.to",
    "netflix.com"
];

const positiveStatusCodes = [200, 201, 204, 301, 302, 303, 304, 308];

function CheckWeb(name) {
    const info = fetch(`https://isitup.org/${name}.json`).then(response => response.json());

    info.then((result) => {
        if (positiveStatusCodes.includes(result.response_code)) {
            if (cliArguments[0] !== name) {
                console.log(`✅  ${clc.red(name)} is up and running`);
            } else {
                console.log(`✅  ${clc.yellow(name)} is up and running`);
            }
        } else {
            console.log(`❌  ${name} is down`);
        }
    });

    info.then(() => {
        fetch(`http://${name}`).then(() => {
            //console.log(response.status);
        }).catch(_error => { console.log(`${clc.red(name)} is inaccessible`); });
    });

    info.catch((_error) => {
        console.log(`❌ cannot access ${clc.red(name)}`);
    });
}

const title = cliArguments.includes("lmao") ? "BRUH LMAO" : "BRUH";

if (cliArguments[0]) {
    if (cliArguments[0].match("\\w{1,99}\.([A-Z]|[a-z]){1,10}")) {
        websites.push(cliArguments[0]);
    }
}

clear();
console.log(
    chalk.red(
        figlet.textSync(title, { horizontalLayout: 'full' })
    )
);

websites.sort().forEach(web => {
    CheckWeb(web);
});