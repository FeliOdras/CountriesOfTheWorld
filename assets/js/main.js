class ShowCountryInfo {
    constructor() {
        this.init()
    }

    init() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => {
                this.countries = countries
                this.render()
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

    showResults() {
        let resultList = this.searchByCountryName();
        console.log(resultList)
        if (resultList.length < 1) {
            return `There is no country name matching your search`
        } else {
            return resultList
                .map(country => {
                    return `
                   <p> Name: ${country.name}</p>
                `
                }).join('');
        }
    }

    addEventListeners() {
        document
            .querySelector('.countrySearch')
            .addEventListener('keyup', () => this.init());
    }

    render() {
        let results = this.showResults();
        let output = ``;
        output += results;
        document.querySelector('.countryInfo').innerHTML = output;
        this.addEventListeners()
    }
}

const newCountryInfo = new ShowCountryInfo();