### Markov Text Generator

Simple command line text generator using a Markov chain.

To use, clone this repo and run `npm install`.

Select either a file of text on your machine or a url with the text you would like to use to generate the text.

Currently, it generates 100 words of text.

#### File Example
To use the 'eggs' text in this folder, enter `node makeText.js file eggs.txt`.

#### URL Example
To use text on the web, provide the url after 'url', for example: `node makeText.js url http://www.gutenberg.org/files/11/11-0.txt`