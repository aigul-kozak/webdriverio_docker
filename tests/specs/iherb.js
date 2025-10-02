import { $, $$, browser, expect } from '@wdio/globals'
import iHerbPage from '../pages/iherbmain.js';


describe('iHerb main page', () => {
         before(async () => {
        await browser.maximizeWindow();
    });

    xit("should accept Cookies,decline Offer and click subcategory", async () => {
        await browser.url('https://bg.iherb.com/');

        await browser.pause(2000)

        await iHerbPage.clickAcceptCookies()
        await browser.pause(2000)

        await iHerbPage.clickNoThanks()
        await browser.pause(2000)

        await iHerbPage.clickmoveToSupplements()
        await browser.pause(2000)

        await iHerbPage.clickAminoAcid()
        await browser.pause(10000)

        expect (browser).toHaveUrl("https://bg.iherb.com/c/amino-acids-blends")
});
})