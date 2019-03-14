class ShowCountryInfo {
    constructor() {
        this.init()
    }

    init() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => this.doLoop(countries))
    }

    doLoop(countries) {
        countries.forEach(country => console.log(country))
    }
}
const newCountryInfo = new ShowCountryInfo();