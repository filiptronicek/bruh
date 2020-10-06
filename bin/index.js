#!/usr/bin/env node

const fetch = require("node-fetch");
const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const clc = require("cli-color");

const websites = [
    "trnck.dev",
    "google.com",
    "github.com",
    "taskord.com",
    "gitlab.com",
    "dev.to",
    "kananas.com"
];

const positiveStatusCodes = [200, 201, 204, 301, 302, 303, 304, 308];

function CheckWeb(name) {
    const info = fetch(`https://isitup.org/${name}.json`).then(response => response.json());

    info.then((result) => {
        if (positiveStatusCodes.includes(result.response_code)) { 
            console.log(`✅  ${clc.red(name)} is up and running`);
        } else {
            console.log(`❌  ${name} is down`);
        }
    });

    info.then(() => {
        fetch(`http://${name}`).then(() => {
            //console.log(response.status);
        }).catch(_error => {console.log(`${clc.red(name)} is inaccessible`);});
    });

    info.catch((_error) => {
        console.log(`❌ cannot access ${clc.red(name)}`);
    });
}

websites.forEach(web => {
    clear();
    console.log(
        chalk.red(
            figlet.textSync('BRUH', { horizontalLayout: 'full' })
        )
    );
    CheckWeb(web);
});
