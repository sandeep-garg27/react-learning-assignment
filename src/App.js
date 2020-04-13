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
        filterResult : [],
        filters: {},
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
            }, this.filterResult);
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
    let filters = {
      "gender" : {},
      "species" : {},
    };
    let searchData =  this.state.intialResult.filter(character => {
      let searchTermConditions = true;

      if(this.state.searchTerm !== null || this.state.searchTerm.trim() !== "") {
        searchTermConditions = (character.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
      }
      
      if(searchTermConditions) {
        filters.gender[character.gender] = character.gender;
        filters.species[character.species] = character.species;
        return character;
      }

      return false;
     });

     console.log(filters);
     filters.gender = Object.values(filters.gender);
     filters.species = Object.values(filters.species);

     this.setState({
      filterResult : searchData,
      filters: filters
    });
  }


  render(){
    //this.extractFilter();
    //console.log(this.state.filterResult)
    
    
      return (
      <div className="App-container container-fluid">

          <Header name="Character Finder"/>

          <div className="row">
            <div className="col-md-4">
                <Filter heading="example" filters = {this.state.filters} />
            </div>
            <div className="col-md-8">
                <Search onChangeHandler={this.searchByNameHandler} />
                <CharachterList result={this.state.filterResult} />
            </div>

          </div>
        </div>
      );
  }
}

export default App;


