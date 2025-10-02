import { $, $$, browser, expect } from '@wdio/globals'
import githubPage from "../pages/github.js"
import githubSignUpPage from "../pages/githubsignaup.js"
import githubEnterprisePage from '../pages/githubenterprise.js'
import githubEnterprisePlan from '../pages/githuborganizationsenterprise_plan.js'
import githubNewsletterPage from '../pages/githubnewsletter.js'
import githubConfirmationPage from '../pages/githubconfirmation.js'
import githubPricingPage from '../pages/githubpricing.js'

describe('Github main page', () => {

    xit("should find and click SignUp", async () => {
        await browser.url('https://github.com/');

        await githubPage.signUp.click()
        await browser.pause(2000)
    });

    xit("should check the title, then input email, password, username, and launch country dropdown", async () => {
        await browser.url('https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home');

        const accept = await $('//*[contains(text(), "Accept") and @class = "_1XuCi2WhiqeWRUVp3pnFG3 erL690_8JwUW-R4bJRcfl"]');

        const isAcceptVisible = await accept.isDisplayed();

        if (isAcceptVisible) {
            await accept.click();
        }

        const title = await githubSignUpPage.signupTitle.getText()
        console.log("signupTitle is: " + title);
        await expect(title).toEqual('Sign up for GitHub')

        await githubSignUpPage.setEmailInput("emailie@emailie.com")
        await browser.pause(2000)

        await githubSignUpPage.setPasswordInput("superPassword1!@&")
        await browser.pause(2000)

        await githubSignUpPage.setUsernameInput("soleusername")
        await browser.pause(2000)

        await githubSignUpPage.clickStartCountry("Bulgaria")
        await browser.pause(2000)
    });

    xit("should scroll to the bottom, check the title, then start free enterprise trial", async () => {
        await browser.url('https://github.com/enterprise')

        await githubEnterprisePage.StartJourneyTitle.scrollIntoView()
        await browser.pause(2000)

        const title = await githubEnterprisePage.StartJourneyTitle.getText()
        console.log("StartJourneyTitle is: " + title);
        await expect(title).toEqual('Start your journey with GitHub')

        await githubEnterprisePage.clickStartFreeTrialBtn()
        await browser.pause(2000)
    });

    xit("should check the title, then click enterprise cloud", async () => {
        await browser.url('https://github.com/organizations/enterprise_plan?ref_cta=Start+a+free+trial&ref_loc=footer&ref_page=%2Fenterprise')

        const title = await githubEnterprisePlan.PickYourTrialPlanTitle.getText()
        console.log("PickYourTrialPlanTitle is: " + title);
        await expect(title).toEqual('Pick your trial plan')

        await githubEnterprisePlan.clickEnterpriseCloudBtn()
        await browser.pause(2000)
    });

    xit("should scroll down and click Subscribe btn", async () => {
        await browser.url('https://github.com/')

        await githubPage.SubscribeBtn.scrollIntoView()
        await browser.pause(2000)

        await githubPage.clickSubscribeBtn()
        await expect(browser).toHaveUrl("https://resources.github.com/newsletter/")
    });

    xit("should check Title and subscribe", async () => {
        await browser.url('https://resources.github.com/newsletter/')

        const title = await githubNewsletterPage.NewsletterTitle.getText()
        console.log("NewsletterTitle is: " + title);
        await expect(title).toEqual('Subscribe to our developer newsletter')

        await githubNewsletterPage.WorkEmailTitle.scrollIntoView()
        await browser.pause(2000)

        await githubNewsletterPage.setEmailInput("emailie@emailie.com")
        await browser.pause(2000)

        await githubNewsletterPage.clickOncountrySelect("Bulgaria")
        await browser.pause(2000)

        await githubNewsletterPage.clickOnCheckbox()
        await browser.pause(2000)

        await githubNewsletterPage.clickOnSubscribe()
        await browser.pause(2000)
        await expect(browser).toHaveUrl("https://resources.github.com/confirmation/")
    });
    xit("should check Title", async () => {
        await browser.url('https://resources.github.com/confirmation/')

        const title = await githubConfirmationPage.Title.getText()
        console.log("ConfirmationTitle is: " + title);
        await expect(title).toEqual('Thanks for subscribing!')

    });
    xit("should put searchword and check search results", async () => {
        await browser.url('https://github.com/')

        await githubPage.clickSearchInput()
        await githubPage.QueryBuilderInput("act")
        await browser.pause(6000)

        const searchTerm = "act"
        const results = await $$('.Box-sc-g0xbh4-0.gPrlij');

        console.log("Count of elements" + results.length);
        for (const result of results) {
            const h3 = await result.$('./h3');
            const div = await result.$('./div[contains(@class, "dcdlju")]');

            let h3text = "";
            let divtext = "";
            if (await h3.isExisting()) h3text = await h3.getText();
            if (await div.isExisting()) divtext = await div.getText();

            const fulltext = h3text + divtext //concatinate header + description

            console.log('Fulltext printed:', fulltext);

            expect(fulltext.toLowerCase()).toContain('act');
        }
    });
    xit("should go to pricing and check Titles", async () => {
        await browser.url('https://github.com/')

        await githubPage.clickPricingLink()
        await expect(browser).toHaveUrl("https://github.com/pricing")

        const title = await githubPricingPage.TryTitle.getText()
        console.log("TryTitle is: " + title);
        await expect(title).toEqual('Try the Copilot-powered platform')

        await githubPricingPage.CompareFeaturesTitle.scrollIntoView()
        await browser.pause(2000)

        await githubPricingPage.clickCompareLink()
        await expect(browser).toHaveUrl("https://github.com/pricing#compare-features")

        const featurestitle = await githubPricingPage.CompareFeaturesTitle.getText()
        console.log("FeaturesTitle is: " + featurestitle);
        await expect(featurestitle).toEqual('Compare features')

    });
});