class ShowCountryInfo {
    constructor() {
        this.init()
    }

    init() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => {
                this.countries = countries
            })
    }
}

const newCountryInfo = new ShowCountryInfo();