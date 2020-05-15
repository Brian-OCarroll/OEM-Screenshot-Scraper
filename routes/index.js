var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const { scrapeFord } = require('../Controllers/OemScraper')
const 
/**
 * findElemByText - Find an Element By Text
 *
 * @param  {String} str                case-insensitive string to search
 * @param  {String} selector = '*'     selector to search
 * @param  {String} leaf = 'outerHTML' leaf of the element
 * @return {Array}                     array of elements
 */
function findElemByText({str, selector = '*', leaf = 'outerHTML'}){
  // generate regex from string
  const regex = new RegExp(str, 'gmi');

  // search the element for specific word
  const matchOuterHTML = e => (regex.test(e[leaf]))

  // array of elements
  const elementArray = [...document.querySelectorAll(selector)];

  // return filtered element list
  return elementArray.filter(matchOuterHTML)
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scrapeford', scrapeFord)

module.exports = router;
