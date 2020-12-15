import React from 'react'
import {connect} from 'react-redux'

const _Places = ({locations, reviews, search, selectLoc})=>{
    const waitTimeAvg = (loc)=>{
        const sameLoc = reviews.filter((review)=>review.locationId === loc);
        const sum = sameLoc.reduce((accum,rev) =>(accum+rev.waitTime),0);
        return sum / sameLoc.length || 0;
    }

    return(
        <div id='place-div'>
                {
                    locations
                    .filter(loc=>{
                        return loc.name.toLowerCase().includes(search);
                    })
                    .map(location=>{
                        return (
                            <div className='location-card' key={location.id}>
                                <img className='loc-img' src={location.img} alt={location.name} />
                                <h2 className="location-name">{location.name}</h2>
                                <h4>{location.city}</h4>
                                {/* {console.log(location.id)} */}
                                <p id='wait-time'>AVG WAIT TIME: {waitTimeAvg(location.id)} minutes</p>
                        <button onClick={()=>selectLoc(location)}>Reviews</button>
                            </div>
                        )
                    })
                }
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        selectLoc: (loc)=>{
            dispatch({
                type: 'SET_LOC',
                loc
            })
        }
    }
}

const Places = connect(state=>state,mapDispatchToProps)(_Places)
export default Places;