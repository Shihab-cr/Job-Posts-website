import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'
import SearchMenu from './SearchMenu'
import { Link, useParams } from 'react-router-dom'
import JobPosts from './JobPosts'
import useFetch from './useFetch'
library.add(fas, far, fab)


const Post = () => {
    
    const {id} = useParams();
    const [darkMode, setDarkMode] = useState(false);
    const {data, isLoading, error, refetch} = useFetch(`http://localhost:8000/data`);
    const [myPost, setMyPost] = useState(null);

    const selectedPost = ()=>{
        return data?.find((item)=>{
            return item.id === id;
        })
    }
    useEffect(()=>{
        setMyPost(selectedPost());
    },[data])


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

    return (
        <div className='Post-Details'>
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
        {error && <div className='errorMessage'><h2>Error: {error} Api id: {id}</h2> </div>}
        {isLoading && <div className='loadingMessage'>Loading post details...</div>}
        {myPost  && 
        <div className='holder'>
            <div className='post-container'>
                <div className='post-title'>
                    <img src={myPost.logo} alt='Logo img'/>
                    <div className='title-box'>
                        <div className='company-Name'>
                            <h3>{myPost.firmName}</h3>
                            <p>{myPost.firmName}.com</p>
                        </div>
                        <button>Company Site</button>
                    </div>
                </div>
                <div className='post-body'>
                    <div className='body-head'>
                        <p>{myPost.submitTime} <b>.</b> {myPost.jobType}</p>
                        <div>
                            <h2>{myPost.jobBreif}</h2>
                            <button className='ApplyBtn'>Apply Now</button>
                        </div>
                        <p className='country'>{myPost.firmCountry}</p>
                    </div>
                    <div className='body-description'>
                        <p>
                            {myPost.jobDescription}
                        </p>
                        <h3 className='subtitle'>Requirements</h3>
                        <p>
                            {myPost.Requirements}
                        </p>
                        <ul>
                            {myPost.RequirementsArray.map((arr)=>{
                                return(<li>{arr}</li>);
                            })}
                        </ul>
                        <h3 className='subtitle'>What You Will Do</h3>
                        <p>
                            {myPost.WhatYouWillDo}
                        </p>
                        <ol>
                            {myPost.WhatYouWillDoArray.map((arr)=>{
                                return(<li>{arr}</li>);
                            })}
                        </ol>
                    </div>
                </div>
            </div>
            <footer>
                <div className='footer-container'>
                    <div>
                        <h2>{myPost.jobBreif}</h2>
                        <p>{myPost.firmName}</p>
                    </div>
                    <button className='ApplyBtn'>Apply Now</button>
                </div>
            </footer>
            </div>
            }
        </div>
    );
}

export default Post;