import { $, $$, browser, expect } from '@wdio/globals'
import exadelPage from "../pages/exadelmain.js"

describe('Exadel main page', () => {

    xit("should click Search put searchword and check search results", async () => {
        await browser.url('https://exadel.com/');

        await exadelPage.clickAcceptAll()
        await browser.pause(2000)
        
    });
     xit("should click Search put searchword and check search results", async () => {
        await browser.url('https://exadel.com/');

        await exadelPage.clicksearchLoop()
        await browser.pause(2000)

        await exadelPage.clickSearchInput("consulting")
        await browser.pause(10000)
        expect (browser).toHaveUrl("https://exadel.com/?s=consulting")

        const searchTerm = "consulting"
        const results = await $$('.c-sr__standard__content');

        console.log("Count of elements  " + results.length);
        for (const result of results) {
            const h2 = await result.$('./h2');
            const div = await result.$('.c-sr__standard__description');

            let h2text = "";
            let divtext = "";
            if (await h2.isExisting()) h2text = await h2.getText();
            if (await div.isExisting()) divtext = await div.getText();

            const fulltext = h2text + divtext //concatinate header + description

            console.log('Fulltext printed:', fulltext);

            expect(fulltext.toLowerCase()).toContain('consulting');
        }
    });
});

        

        
    
        
