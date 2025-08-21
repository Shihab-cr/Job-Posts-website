import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const PostCard = ({data, isLoading, error}) => {
    

    return (
        <div className='Card-container'>
            {error && <div className='errorMessage'><h2>{error}</h2></div>}
            {isLoading && <div className='loadingMessage'>Loading job post...</div>}
            {data &&
            data.map((post, index)=>
            (
                <Link to={`/post/${post.id}`}>
                <div className='box' key={post.id}>
                    <img src={post.logo} alt='firm Logo'/>
                    <p>{post.submitTime} . {post.jobType}</p>
                    <h3>{post.jobBreif}</h3>
                    <p>{post.firmName}</p>
                    <p className='country'>{post.firmCountry}</p>
                </div>
                </Link> 
            )
            )}
            {!isLoading && data == "" && 
            <div>
                <h2 className='no-results'>No Job posts found</h2>
            </div>} 
        </div>
    );
}

export default PostCard;