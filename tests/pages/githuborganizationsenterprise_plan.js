class githubEnterprisePlan {

    get PickYourTrialPlanTitle() { return $('//*[contains (text(), "Pick your trial plan") and @class = "d-md-block mt-0 mb-3 text-center h1 lh-condensed-ultra "]') }
    get EnterpriseCloudBtn() { return $('//*[contains (text(), "Enterprise Cloud") and @class = "mb-1 h5-mktg text-center"]') }

    async clickEnterpriseCloudBtn() {
        await this.EnterpriseCloudBtn.click()
    }

}
export default new githubEnterprisePlan()