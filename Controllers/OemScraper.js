module.exports.scrapeFord = async (req, res) => {
    const { zip } = req.body
    // (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.ford.com/suvs-crossovers/escape/pricing-and-incentives/?gnav=vhpnav');
    
        await page.evaluate(() => { document.querySelector('.postal-code-wrapper').style.display = 'block'; });
        await page.focus('#txt_zipCode');
        await page.keyboard.type(zip);
        await Promise.all([ // waits for page change after inputting zip
          page.keyboard.press('Enter'),
          page.waitForNavigation()
        ]);
        await page.$$eval('.io-disclaimer', disclaimers => {
          disclaimers.forEach(disclaimer => {
            disclaimer.classList.remove('visuallyHidden')
            disclaimer.style.position = "initial"
            disclaimer.style.maxHeight = "500px"
          })
        })
        //finds the index of the finance special
         let financeIndex = await page.$$eval('.featuredRetailOffersContainer .io-large-card .io-disclaimer', names => names.findIndex(name => name.textContent.includes('% APR financing')));
    
        if ( financeIndex !== -1 ) { //click retail offers index that has a finance special if it exists
          let cards = await page.$$('.featuredRetailOffersContainer .io-large-card');
          let financeCard = cards[financeIndex];
          console.log(financeCard)
          await financeCard.click()
        }
    
        await page.screenshot({ path: 'example.png', fullPage: true });
    
        await browser.close();
        res.json({ status: 'done' })
    //   })();
}
