class githubInterview {

    get Block33() { return $('.lh-condensed mb-3') }
    get jumpInto() {return $('//*[contains(@class,"Primer_Brand__Text-module__Text___pecHN Primer_Brand__Text-module__Text-font--mona-sans___GpzSG Primer_Brand__Text-module__Text--default___DChoE Primer_Brand__Text-module__Text--300___TBQTB Primer_Brand__Text-module__Text--antialiased___fYDxq Primer_Brand__Text-module__Text--weight-normal___siVLX") and text()="Jump into GitHub Projects"]')}
    get Title() {return $('//*[contains(@class,"Primer_Brand__Heading-module__Heading___IVpmp Primer_Brand__Heading-module__Heading-font--mona-sans___SCnTx Primer_Brand__Heading-module__Heading--2___TFg09 Primer_Brand__Hero-module__Hero-heading___QuVBH") and text()="Project planning for developers"]')}


     async clickJumpInto() {
        await this.jumpInto.click()
    }

}
export default new githubInterview()



