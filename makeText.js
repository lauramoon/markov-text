/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { htmlToText } = require('html-to-text');
const {MarkovMachine} = require('./markov');
const argv = process.argv;

function useFile(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`);
            console.error("  " + err);
            process.exit(1);
        }
        console.log(getMarkovText(data));
      });
}

async function useURL(url) {
    try {
        const res = await axios.get(url);
        const text = htmlToText(res.data, {
            wordwrap: false
        });
        console.log(getMarkovText(text));
    } catch (err) {
        console.log(`Error fetching ${url}:`);
        console.log("  " + err);
    }
}

function getMarkovText(text) {
    let mm = new MarkovMachine(text);
    return mm.makeText();
}

if (argv[2].toLowerCase() === 'file') {
    useFile(argv[3]);
} else if (argv[2].toLowerCase() === 'url') {
    useURL(argv[3]);
} else {
    console.log("Enter 'file' or 'url' after 'makeText.js'");
}