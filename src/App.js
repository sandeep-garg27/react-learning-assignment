import React from 'react';
import Filter from './component/filter/filter';
import Search from './component/search/search';
import CharachterList from './component/search-result/character-list';
import Header from './component/header';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



class App extends React.Component {

  constructor(){
    super();
    this.state = { 
        intialResult : [],
        filteredResult : [],
        filters: {},
        appliedFilters:{},
        searchTerm:""
      }
  }


  componentDidMount() {
      fetch('http://rickandmortyapi.com/api/character/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          this.setState({
              intialResult: data.results,
            }, ()=>{
              this.extractFilter();
              this.filterResult();
            });
      });

  }

  searchByNameHandler = (event) => {
    console.log(event.target.value);
    let searchTerm = "";
    if(event.target.value.trim().length){
      searchTerm = event.target.value;
    }

    this.setState({searchTerm:searchTerm}, () => {this.filterResult(this.state.searchTerm, this.state.filters)});
    
  }

  filterResult = () => {
    let searchData =  this.state.intialResult.filter(character => {
      let searchTermConditions = true;
      let filtersConditions = true;

      if(this.state.searchTerm !== null || this.state.searchTerm.trim() !== "") {
        searchTermConditions = (character.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
      }

      if (this.state.appliedFilters) {
        if (this.state.appliedFilters.gender) {
          filtersConditions = filtersConditions && this.state.appliedFilters.gender.includes(character.gender);
        }

        if (this.state.appliedFilters.species) {
          filtersConditions = filtersConditions && this.state.appliedFilters.species.includes(character.species);
        }
      }
      
      if(searchTermConditions && filtersConditions) {
        return character;
      }

      return false;
     });

     this.setState({
      filteredResult : searchData
    });
  }

  onFilterChangeHandler = (event) => {
    console.log(event, event.target.dataset.filterCategory);
    let filters = {
      gender : [...this.state.appliedFilters.gender], 
      species: [...this.state.appliedFilters.species]
    };
    
    if (event.target.checked && !filters[event.target.dataset.filterCategory].includes(event.target.value)) {
      filters[event.target.dataset.filterCategory].push(event.target.value);
    } else {
      filters[event.target.dataset.filterCategory].splice(filters[event.target.dataset.filterCategory].indexOf(event.target.value),1);
    }
    //filters["gender"].splice(0,1);
    //this.filterResult();
    this.setState({appliedFilters:filters}, this.filterResult);
  }

  extractFilter() {
    console.log("called extract Filter function");
    let filters = {
      "gender" : {},
      "species" : {},
    };
    
    this.state.intialResult.map((character) => {
      filters.gender[character.gender] = character.gender;
      filters.species[character.species] = character.species;

    });

    filters.gender = Object.values(filters.gender);
    filters.species = Object.values(filters.species);

    this.setState({filters:filters, appliedFilters: filters});

  }


  render(){
      return (
      <div className="App-container container-fluid">

          <Header name="Character Finder"/>

          <div className="row">
            <div className="col-md-4">
                <Filter heading="example" filters = {this.state.filters} onChangeHandler={this.onFilterChangeHandler} />
            </div>
            <div className="col-md-8">
                <Search onChangeHandler={this.searchByNameHandler} />
                <CharachterList result={this.state.filteredResult} />
            </div>

          </div>
        </div>
      );
  }
}

export default App;


