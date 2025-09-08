import {useState, useEffect} from 'react'
import PostCard from './PostCard';

const JobPosts = ({generalFilter, setGeneralFilter, countryFilter, setCountryFilter, isSearching, setIsSearching, isFiltered}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [searchData, setSearchData] = useState(null);
    const [displayData, setDisplayData] = useState(null);


    useEffect(()=>{
        setIsLoading(true);
        fetch('/db.json')
        .then(res=>{
            if(!res.ok){
                throw Error("could not load data from db check PostCard");
            }
            return res.json()
        })
        .then(data=>{
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        })
        .catch((err)=>{
            setError(err.message);
            setIsLoading(false);
        })
    },[])


    // useEffect(()=>{
    //     let filtered = data;
    //     if(!isFiltered){
    //         filtered = filtered.filter(post=>{
    //             return(post.jobType.trim().toLowerCase()==="full time");
    //         })
    //         // let istrue = isFiltered? filtered.filter((post)=>post.jobType.trim().toLowerCase()==="full time")
    //     }
    //     else{
    //         filtered = data;
    //     }
    //     setFilteredData(filtered);
    // },[isFiltered])
    
        
    useEffect(()=>{
        // if(isSearching){

            let searchResult = data;

            const generalSearch = generalFilter.trim() !== "";
            const countrySearch = countryFilter.trim() !== "";

            if(generalSearch){
                searchResult = searchResult.filter(post=>{
                    return post.firmName.toLowerCase().includes(generalFilter.toLowerCase())||
                    post.jobBreif.toLowerCase().includes(generalFilter.toLowerCase());
                })
                // setFilteredData(filtered);
            }
            if(countrySearch){
                searchResult = searchResult.filter(post=>{
                    return( post.firmCountry.toLowerCase().includes(countryFilter.toLowerCase()));
                })
                // setFilteredData(filtered);
            }

            if(!generalSearch && !countrySearch){
                setSearchData("");
            }
            else{
                setSearchData(data);
            }
            // setIsSearching(false);
            setSearchData(searchResult)
        }
    // }
    , [ data, generalFilter, countryFilter])


    useEffect(()=>{
        let baseData = Array.isArray(searchData)? searchData:data;
        if(!Array.isArray(baseData)){
            setDisplayData([]);
        }

        if(isFiltered){
            let fr = baseData.filter((data)=>{
                return(data.jobType.trim().toLowerCase() === "full time");
            })
            setDisplayData(fr);
        }
        else{
            // baseData = data;
            setDisplayData(baseData);
        }
    },[data, searchData, isFiltered])

    return ( 
        <div className="JobPost-container">
            <PostCard data={displayData} isLoading={isLoading} error={error} />
        </div>
    );
}

export default JobPosts
