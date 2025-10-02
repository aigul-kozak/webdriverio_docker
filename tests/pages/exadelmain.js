class exadelPage {

    get acceptAll() {return $('//*[contains(text(),"Accept All Cookies") and @id = "onetrust-accept-btn-handler"]')}
    get searchLoop() { return $('//*[@aria-label="Global Search"]') }
    get SearchInput() { return $('//*[contains(@class,"c-input h4 ")  and @aria-label="What are you looking for?"]') }
    
    async clickAcceptAll() {
        await this.acceptAll.click()
    }
    
    async clicksearchLoop() {
        await this.searchLoop.click()
    }
    
    async clickSearchInput(vSearchword) {
        await this.SearchInput.click()
        await this.SearchInput.addValue(vSearchword)
        await browser.keys('Enter')
    }
    


}
export default new exadelPage()