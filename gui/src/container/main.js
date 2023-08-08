import React, { useEffect, useState } from "react";
import { SearchForm, CardsContainer } from "./../components"
function SearchContainer(){
    const [searchValue, setSearchValue] = useState('')

    const setSearchValueCB = (value) => {
        setSearchValue(value)
        console.log(value)
    }

    return (
        <div className="container">
            <div className="input__container">
                <SearchForm
                    setSearchValueCB={setSearchValueCB}
                />
            </div>
            <div className="output__container">
                <CardsContainer searchValue={searchValue}/>
            </div>
        </div>
    )
}

export default SearchContainer;