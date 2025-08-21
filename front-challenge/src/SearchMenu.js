import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'

const SearchMenu = ({generalFilter, setGeneralFilter, countryFilter, setCountryFilter, isSearching, setIsSearching, setIsFiltered, isFiltered}) => {
    
    const handleSearch = ()=>{
        setIsSearching(true);
    }
    const handleFilter = ()=>{
        if(isFiltered){
            setIsFiltered(!isFiltered)
        }
        else{
            setIsFiltered(!isFiltered)
        }
    }
    return ( 
        <div className="Search-container">
            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
            <input type="text" placeholder="Filter by title, companies, expertise" value={generalFilter} onChange={(e)=>setGeneralFilter(e.target.value)}></input>
            <FontAwesomeIcon icon={['fas','location-dot']} />
            <input  type="text" placeholder="Filter by location..." value={countryFilter} onChange={(e)=>setCountryFilter(e.target.value)} className="inputLocation"></input>
            <label><input type='checkbox' className='myCheckBox' 
                onChange={(e)=>{setIsFiltered(e.target.checked)}}
                checked={isFiltered}    
                />Full Time Only</label>
                
            <button className='filter' onClick={handleFilter}> <FontAwesomeIcon icon={['fas','filter']}/></button>
            {/* <button onClick={handleSearch}>Search</button> */}
        </div>
    );
}

export default SearchMenu