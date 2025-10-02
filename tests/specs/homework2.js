import { $, browser, expect } from '@wdio/globals'
import assert from 'assert/strict'

describe('Webdriverio main page (Homework2)', () => {

    xit("should find and click APIbutton", async () => {
        await browser.url('https://webdriver.io/')

        const APIButton = await $('nav a[href="/docs/api"]')
        await APIButton.click()
        await browser.pause(2000);
    });

    xit("should scroll to BlogLink and check if BlogLink is displayed", async () => {
        await browser.url('https://webdriver.io/')
        const BlogLink = await $('.footer__link-item[href="/blog"]')
        await browser.pause(2000)
        await BlogLink.scrollIntoView()
        await browser.pause(2000)

        let displayed = await BlogLink.isDisplayed()
        console.log("Is displayed: " + displayed); //outputs: true
    });

    xit("should scroll till ProtocolCommandsLink and check if ProtocolCommandsLink is visible and clickable", async () => {
        await browser.url('https://webdriver.io/docs/api')


        const ProtocolCommandsLink = await $('.pagination-nav__label')
        await browser.pause(2000)
        await ProtocolCommandsLink.scrollIntoView()
        await browser.pause(2000)
        const isVisibleInViewport = await ProtocolCommandsLink.isDisplayed({ withinViewport: true });
        console.log("Is ProtocolCommands in viewport: " + isVisibleInViewport); // outputs: true

        let clickable = await ProtocolCommandsLink.isClickable()
        console.log("Is ProtocolCommandsLink clickable: " + clickable) //outputs: true
    });

    xit("should get html for ProtocolCommandsLink", async () => {
        await browser.url('https://webdriver.io/docs/api')

        const outerHTML = await $('.pagination-nav__label')
        console.log("Outer HTML: " + outerHTML)

        const innerHTML = await $('.pagination-nav__label').getHTML(false)
        console.log("Inner HTML: " + innerHTML)
    });

    xit("should click ProtocolCommandsLink, wait for WebDriverProtocol title to appear", async () => {
        await browser.url('https://webdriver.io/docs/api')

        const ProtocolCommandsLink = await $('.pagination-nav__label')
        await browser.pause(2000)
        await ProtocolCommandsLink.scrollIntoView()
        await browser.pause(2000)
        await ProtocolCommandsLink.click()

        await browser.waitUntil(
            async () => {
                return $('#webdriver-protocol').isDisplayed();
            }, 5000, 'The element #webdriver-protocol has not appeared in 10 seconds'
        );

    });



});
