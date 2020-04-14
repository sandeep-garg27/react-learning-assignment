import React from 'react';

const FilterBox = props => {
    let options = props.options.map((option) => {
        return (        
            <div key={`${props.filterName}-${option}`} className="form-check">
                <input className="form-check-input filter-checkboxes" type="checkbox" id={`${props.filterName}-${option}`} value={option} defaultChecked onChange={props.onchange} data-filter-category={props.filterName} name={`filter[${props.filterName}]`} />
                <label className="form-check-label" htmlFor={`${props.filterName}-${option}`}>{option}</label>
            </div>
        )
    });

    return(

    <div className="card bg-light mb-3">
        <div className="card-header">{props.filterName}</div>
        <div className="card-body">
            {options}    
        </div>
    </div>
    )
}



export default FilterBox;