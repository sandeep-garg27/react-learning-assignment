import React from 'react'
import FilterBox from './filter-box';

class Filter extends React.Component {
    render(){
        let FilterBoxes = [];
        for (let key in this.props.filters) {
            let options = this.props.filters[key];
            FilterBoxes.push(<FilterBox key={key} filterName={key} options = {options}></FilterBox>)
        }
        console.log(FilterBoxes);
       return(
            <div className="filter-container">
                <h4>Filters</h4>  
                {FilterBoxes}
             </div>   
        )
    }
}

export default Filter;