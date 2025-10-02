import { $, $$, browser, expect } from '@wdio/globals'
import LoginPage from "./../pages/homepage.js"
import MainPage from "./../pages/douhome.js"
import techStoriesPage from "../pages/techstories.js";

describe('Webdriverio main page', () => {

    xit("should have correct title", async () => {
        await browser.url('https://webdriver.io/')

        const title = await browser.getTitle()
        console.log(title);
        await expect(browser).toHaveTitle(
            'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    });
    xit("should show addValue command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');

        let input = await $("#username")
        await input.addValue("hello")
        await browser.pause(2000)

        await input.addValue(123)
        await browser.pause(2000)

        await expect(input).toHaveValue("hello123")
    });
    xit("should show setValue command", async () => {

        let input = await $("#username")
        await input.setValue("world")
        await browser.pause(2000)
        await input.setValue("hello")
        await browser.pause(2000)

        console.log(await input.getValue())
        await expect(input).toHaveValue("hello")
    });
    xit("should show click command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        let loginButton = await $('.radius')
        await browser.pause(2000)
        await loginButton.click()
        await browser.pause(4000)

        let inputUsername = await $("#username")
        await inputUsername.addValue("tomsmith")
        await browser.pause(2000)

        let inputPassword = await $('#password')
        await inputPassword.addValue("SuperSecretPassword!")
        await browser.pause(2000)

        await loginButton.click()
        await browser.pause(4000)
    });
    xit("should show getAttribute command", async () => {
        await browser.url('https://dou.ua/search');

        let inputSearch = await $('#gsc-i-id1')
        let attr = await inputSearch.getAttribute("aria-label")
        console.log("Placeholder attribute is: " + attr) //outputs:шукати

        await inputSearch.setValue("Cat")
        attr = await inputSearch.getValue()
        await browser.pause(2000)
        console.log("Value attribute is: " + attr) //outputs:Cat
    });
    
    xit("should show getLocation command", async () => {
        await browser.url('https://dou.ua');

        let inputSearch = await $('#txtGlobalSearch')
        let location = inputSearch.getLocation()
        console.log("Location is: " + location)  //  outputs: x,y

        let xlocation = await inputSearch.getLocation("x")
        console.log("Location by x: " + xlocation)  //  outputs: x
    });
    xit("should show getText command", async () => {
        await browser.url('https://webdriver.io');

        let subtitle = await $('.hero__subtitle')
        console.log("Subtitle text is: " + await subtitle.getText())  // outputs: Next-gen browser...
    });

    xit("should show if an element is clickable", async () => {
        await browser.url('https://webdriver.io');

        const blogButton = await $('.button[href="/docs/gettingstarted"]')
        let clickable = await blogButton.isClickable()
        console.log("Is clickable: " + clickable) //outputs: true
    });

    xit("should show if an element is displayed", async () => {
        await browser.url('https://webdriver.io');

        const blogButton = await $('.button[href="/docs/gettingstarted"]')
        let displayed = await blogButton.isDisplayed()
        console.log("Is displayed: " + displayed) //outputs: true
    });

    xit("should show if an element is visible", async () => {
        await browser.url('https://webdriver.io');

        const getStartedLink = await $('a[href="/docs/gettingstarted"]')
        const isVisibleInViewport = await $('.footer__link-item[href="/docs/gettingstarted"]').isDisplayed({ withinViewport: true });
        console.log("Is get started link in viewport: " + isVisibleInViewport); // outputs: false
    });

    xit("should show if an element is enabled", async () => {
        await browser.url('https://webdriver.io');

        const getStartedButton = await $('.button[href ="/docs/gettingstarted"]')
        let isEnabled = await getStartedButton.isEnabled()
        console.log("Is get started button enabled: " + isEnabled) // outputs: true
    });

    xit("should show if an element is focused", async () => {
        await browser.url('https://webdriver.io');

        const getStartedButton = await $('.button[href ="/docs/gettingstarted"]')
        let isFocusedBeforeClick = await getStartedButton.isFocused()
        console.log("Is get started button focused before click: " + isFocusedBeforeClick) // outputs: false

        await browser.pause(2000)
        await getStartedButton.click()
        let isFocusedAfterClick = await getStartedButton.isFocused()
        console.log("Is get started button focused after click: " + isFocusedAfterClick) // outputs: false
        await browser.pause(2000)

    });

    xit("should show movement to element action", async () => {
        await browser.url('https://webdriver.io');

        const getStartedLink = await $('.footer__link-item[href="/docs/gettingstarted"]')
        await browser.pause(2000)
        await getStartedLink.scrollIntoView()
        await browser.pause(2000)

    });

    xit("should show save screenshot command", async () => {
        await browser.url('https://webdriver.io');

        const getStartedLink = await $('.footer__link-item[href="/docs/gettingstarted"]')
        await browser.pause(2000)
        await getStartedLink.scrollIntoView()
        await browser.pause(5000)
        await getStartedLink.saveScreenshot('linkscreenshot.png')
    });

    xit("should switch to another window", async () => {
        await browser.url('https://webdriver.io');

        await browser.newWindow('https://google.com');
        await browser.pause(5000)
        await browser.switchWindow('https://webdriver.io');
        await browser.pause(5000)
    });

    xit("should show waitUntil command", async () => {
        await browser.url('https://webdriver.io');

        await browser.waitUntil(async () => {
            return $('.button[href="/docs/gettingstarted"]').isDisplayed();
        }, 5000, "Button is not displayed")
    });

    xit("should get html for certain elements", async () => {
        await browser.url('https://webdriver.io');

        const outerHTML = await $('.dropdown__menu').getHTML()
        console.log("Outer HTML: " + outerHTML)

        const innerHTML = await $('.dropdown__menu').getHTML(false)
        console.log("Inner HTML: " + innerHTML)
    });

    xit("should show addValue command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');

        await LoginPage.setUsernameInput(123)
        await browser.pause(2000)

        await LoginPage.username.addValue("hello")
        await browser.pause(2000)

        await LoginPage.setPasswordInput("superpassword!")
        await browser.pause(2000)

        await LoginPage.clickOnLoginBtn()

        // await expect(LoginPage.username).toHaveValue("123hello")
    });

    xit("should click on buttons and open a new page", async () => {
        await browser.url('https://dou.ua');

        await MainPage.clickOnBandBtn()
        await browser.pause(2000)

        await MainPage.clickOnForumBtn()
        await browser.pause(2000)

        await MainPage.clickOnTechStoriesBtn()
        await browser.pause(2000)
        
        expect(techStoriesPage.techStoriesTitle).toHaveValue("Технічні статті й дайджести")

        //await MainPage.clickOnDevTechBtn()
        //await browser.pause(2000)

        //await expect(MainPage.bandBtn).toBeClickable()
    });

})
