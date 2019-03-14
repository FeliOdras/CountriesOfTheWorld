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

    showlistOf(list, property) {
        return list.map(
            item => item[property]
        ).join(', ')
    }

    countLanguages(languages) {
        return (Object.keys(languages).length < 2 ?
            'Language' :
            'Languages')
    }

    countCurrencies(currencies) {
        return (Object.keys(currencies).length < 2 ?
            'Currency' :
            'Currencies')
    }

    showResults() {
        let resultList = this.searchByCountryName();
        console.log(resultList)
        return (resultList.length < 1 ?
            `There is no country name matching your search` :
            resultList
            .map(country => {
                return `
                    <div class="singleCountry">
                    <h3>
                    ${country.name} (${country.alpha3Code})<br>
                    ${country.regionalBlocs.length > 0 ? `<small>${this.showlistOf(country.regionalBlocs, 'name')} (${this.showlistOf(country.regionalBlocs, 'acronym')})</small>` : ``}
                    </h3>
                    <img src="${country.flag}" alt="${country.name}" width="150">
                    <ul> 
                        <li>Capital: ${country.capital}  </li>
                        <li>Native Name: ${country.nativeName}</li>
                        <li>${this.countLanguages(country.languages)}: ${this.showlistOf(country.languages, 'name')}</li>
                        <li>Population: ${country.population}</li>
                        <li>${this.countCurrencies(country.currencies)}: ${this.showlistOf(country.currencies, 'name')} (${this.showlistOf(country.currencies, 'symbol')})</li>
                    </ul>
                    <ul>
                       
                        <li>Calling Code: +${country.callingCodes}</li>
                        <li>Region: ${country.region}</li>
                        <li>Subrgion: ${country.subregion}</li>
                        <li>TDL: ${country.topLevelDomain}
                    </ul>
                   </div>
                `
            }).join(''));
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