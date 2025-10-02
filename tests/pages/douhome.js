class MainPage {
    get forumBtn() { return $('a[href="https://dou.ua/forums/"]') }
    get bandBtn() { return $('a[href="https://dou.ua/lenta/"]') }
    get salariesBtn() { return $('a[href="https://jobs.dou.ua/lenta/"]') }
    get searchInput() { return $('#txtGlobalSearch') }
    get DevTechBtn() { return $('.menu-site menu-site__deftech') }
    get relocateBtn() { return $('.menu-site__relocate') }
    get techStories() {return $('a[href="https://dou.ua/forums/tags/tech/?from=fortech"]')}
    
    async clickOnTechStoriesBtn() {
        await this.techStories.click()
    }
    async clickOnForumBtn() {
        await this.forumBtn.click()
    }
    async clickOnBandBtn() {
        await this.bandBtn.click()
    }
    async clickOnDevTechBtn() {
        await this.DevTechBtn.click()
    }
    async searchInput(value) {
        await this.searchInput.addValue(value)
    }
}

export default new MainPage()
