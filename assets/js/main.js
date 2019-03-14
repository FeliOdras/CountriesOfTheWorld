class ShowCountryInfo {
    constructor() {
        this.init()
    }

    init() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => {
                this.countries = countries
                this.searchByCountryName()
            })
    }

    searchByCountryName() {
        let countryList = this.countries;
        countryList.forEach(
            country => {
                let searchValue = document.querySelector('.countrySearch').value.toLowerCase();
                let countryName = country.name.toLowerCase();
                let countryMatch = countryName.match(searchValue);
                let searchMatch = ``;
                countryMatch != null ? searchMatch = true : searchMatch = false;
                country.isSearchMatch = searchMatch;
            }
        )
        return countryList.filter(country => country.isSearchMatch == true);
    }
}

const newCountryInfo = new ShowCountryInfo();