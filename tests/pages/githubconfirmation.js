class githubConfirmationPage {

    get Title() { return $('//*[contains (text(), "Thanks for subscribing!") and @class = "Primer_Brand__Heading-module__Heading___IVpmp Primer_Brand__Heading-module__Heading-font--mona-sans___SCnTx Primer_Brand__Heading-module__Heading--1___Ufc7G Primer_Brand__Hero-module__Hero-heading___QuVBH"]') }


}
export default new githubConfirmationPage()