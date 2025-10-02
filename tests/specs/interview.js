import { $, $$, browser, expect } from '@wdio/globals'
import githubInterview from "../pages/githubinterview.js"

describe('Github main page', () => {
    
    it("should redirect to another page", async () => {
        await browser.url('https://github.com/');

        await githubInterview.jumpInto.scrollIntoView()
        await browser.pause(2000)

        await githubInterview.clickJumpInto()
        await browser.pause(2000)

        const title = await githubInterview.Title.getText()
        console.log("Title is:   " + title);
        await expect(title).toEqual('Project planning for developers')
        });
});



