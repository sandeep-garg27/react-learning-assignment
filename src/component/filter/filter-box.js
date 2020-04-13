import React from 'react';

const FilterBox = props => {
    let options = props.options.map((option) => {
        return (        
            <div key={`${props.filterName}-${option}`} className="form-check">
                <input className="form-check-input" type="checkbox" id={`${props.filterName}-${option}`} value={option} />
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