import React, { useEffect, useState } from "react";
import "./../assets/styles.less"
function SearchForm(props){
    const {setSearchValueCB} = props;
    const [searchInput, setSearchInput] = useState('');

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h1>Artist Tours</h1>
            <div className="search-bar">
                <i className="fa fa-search icon"></i>
                <input
                    className="search-field"
                    type="text"
                    onChange={e => {
                        setSearchInput(e.target.value)
                        setSearchValueCB(e.target.value)
                    }}
                    placeholder="Search..."
                    value={searchInput}
                />
            </div>
        </div>
    );
}

export default SearchForm;