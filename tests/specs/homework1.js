import { $, browser, expect } from '@wdio/globals'

describe.skip('Webdriverio main page (Homework1)', () => {

    it("should find and click APIbutton", async () => {
        await browser.url('https://webdriver.io/')

        let APIButton = await $('a[href="/docs/api"]')
        await APIButton.click()

        const url = await browser.getUrl();
        console.log("APIbutton url is: " + url)   //outputs: apibutton url

        await expect(browser).toHaveUrl('https://webdriver.io/docs/api')
    });

    it("should check if h1 is Inroduction and there is a bread crump Introduction", async () => {
        await browser.url('https://webdriver.io/docs/api')

        let header = await $('h1=Introduction')
        console.log("Header text is: " + await header.getText())  // outputs: Header text is: Introduction
        await expect(header).toHaveText('Introduction')

        let breadCrump = await $('//span[@class="breadcrumbs__link" and text()="Introduction"]')
        console.log("BreadCrump text is: " + await breadCrump.getText())  // outputs: BreadCrump text is: Introduction
        await expect(breadCrump).toHaveText('Introduction')
    });
    it("should check if Webdriver link is correct", async () => {
        await browser.url('https://webdriver.io/docs/api')

        let webdriverLink = await $('a[href="/docs/api/webdriver"]')
        console.log("webdriverLink is: " + await webdriverLink.getAttribute("href"))  // outputs: webdriverLink is: /docs/api/webdriver

        await webdriverLink.click()
        await expect(webdriverLink).toHaveUrl('https://webdriver.io/docs/api/webdriver')
    });
    it("should click the Search, make entry, erase entry", async () => {
        await browser.url('https://webdriver.io')
        let searchButton = await $('.DocSearch-Button-Placeholder')
        await browser.pause(2000)

        await searchButton.click()
        await browser.pause(2000)

        let inputSearch = await $(".DocSearch-Input")
        await inputSearch.addValue("all is done")
        await browser.pause(2000)
        await inputSearch.clearValue()
    })
})