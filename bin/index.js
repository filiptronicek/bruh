#!/usr/bin/env node

const fetch = require("node-fetch");

const websites = [
    "trnck.dev",
    "google.com",
    "github.com",
    "taskord.com",
    "gitlab.com",
    "dev.to",
    "downloads.trnck.dev"
];

function CheckWeb(name) {
    const info = fetch(`https://isitup.org/${name}.json`).then(response => response.json());

    info.then((result) => {
        if (result.response_code === 200 | result.response_code === 301) { 
            console.log(`✅ ${name} is up and running`);
        } else {
            console.log(`❌ ${name} is down`);
        }
    });

    info.then(() => {
        fetch(`http://${name}`).then(response => {
            //console.log(response.status);
        }).catch(_error => {console.log(`${name} is inaccessible`);});
    });

    info.catch((_error) => {
        console.log(`❌ cannot access ${name}`);
    });
}

websites.forEach(web => {
    CheckWeb(web);
});
