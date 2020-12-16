import React from 'react'
import {connect} from 'react-redux'
import SelectedLoc from './SelectedLoc';

const _Places = ({locations, reviews, search, selectLoc, selectedCat})=>{
    const waitTimeAvg = (loc)=>{
        const sameLoc = reviews.filter((review)=>review.locationId === loc);
        const sum = sameLoc.reduce((accum,rev) =>(accum+rev.waitTime),0);
        return Math.round(sum / sameLoc.length) || 0;
    }

    return(
        <div id='place-div'>
                {   
                    locations
                    .filter(loc=>{
                        if(selectedCat.length > 0){
                            return loc.categoryId===selectedCat*1;
                        }else{
                            return loc;
                        }
                    })
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