class githubEnterprisePage {

    get StartJourneyTitle() { return $('//*[contains (text(), "Start your journey with GitHub") and @class = "Primer_Brand__Heading-module__Heading___IVpmp Primer_Brand__Heading-module__Heading-font--mona-sans___SCnTx Primer_Brand__Heading-module__Heading--1___Ufc7G Primer_Brand__Heading-module__Heading--weight-bold___Zqsyk mb-4"]') }
    get StartFreeTrialBtn() { return $('//*[contains (text(), "Start a free trial") and @class = "Primer_Brand__Text-module__Text___pecHN Primer_Brand__Text-module__Text-font--mona-sans___GpzSG Primer_Brand__Text-module__Text--default___DChoE Primer_Brand__Text-module__Text--200___XAIGT Primer_Brand__Text-module__Text--antialiased___fYDxq Primer_Brand__Text-module__Text--weight-semibold___Ns19j Primer_Brand__Button-module__Button--label___lUBc0 Primer_Brand__Button-module__Button--label-medium___DW2TM Primer_Brand__Button-module__Button--label-primary___Leisi"]') }
    
    async clickStartFreeTrialBtn() {
        await this.StartFreeTrialBtn.click()
    }
    
}
export default new githubEnterprisePage()

