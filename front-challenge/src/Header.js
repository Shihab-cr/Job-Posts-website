import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'
import SearchMenu from './SearchMenu'
import { Link } from 'react-router-dom'
import JobPosts from './JobPosts'
library.add(fas, far, fab)
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(()=>{
        if(darkMode){
            document.body.classList.add('dark');
        }
        else{
            document.body.classList.remove('dark');
        }},[darkMode])
    const handleViewMode = ()=>{
        setDarkMode(!darkMode);
    }
    const [generalFilter, setGeneralFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    return (
        <div className='headerParent'>
            <div className="header">
                <div className='container'>
                    <Link to='/'><h3>devJobs</h3></Link>
                    <div className='viewMode'>
                        <FontAwesomeIcon icon={['fas','sun']} />
                        <button onClick={handleViewMode}></button>
                        <FontAwesomeIcon icon={['fas', 'moon']} />
                    </div>
                </div>
            </div>
            <div className='searchMenu'>
                <SearchMenu 
                generalFilter={generalFilter}
                setGeneralFilter={setGeneralFilter} 
                countryFilter={countryFilter} 
                setCountryFilter={setCountryFilter}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                setIsFiltered={setIsFiltered}
                isFiltered={isFiltered}
                />
                
            </div>
            <JobPosts
                generalFilter={generalFilter}
                setGeneralFilter={setGeneralFilter} 
                countryFilter={countryFilter} 
                setCountryFilter={setCountryFilter}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                isFiltered={isFiltered}
                />
        </div>
    );
}

export default Header;