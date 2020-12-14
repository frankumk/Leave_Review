import React from 'react'
import {connect} from 'react-redux'

const _Places = ({locations, reviews})=>{

    const waitTimeAvg = (loc)=>{
        const sameLoc = reviews.filter((review)=>review.locationId === loc);
        console.log(sameLoc);
        const sum = sameLoc.reduce((accum,rev) =>(accum+rev.waitTime),0);
        console.log(sum);
        return sum / sameLoc.length || 0;
    }

    return(
        <div id='place-div'>
                {
                    locations.map(location=>{
                        return (
                            <div className='location-card' key={location.id}>
                                <img src={location.img} alt={location.name} />
                                <h2 className="location-name">{location.name}</h2>
                                <h4>{location.city}</h4>
                                {console.log(location.id)}
                                <p id='wait-time'>AVG WAIT TIME: {waitTimeAvg(location.id)} minutes</p>
                                <button>Reviews</button>
                            </div>
                        )
                    })
                }
        </div>
    )
}

const Places = connect(state=>state)(_Places)
export default Places;