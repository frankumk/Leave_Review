import React from 'react'
import {connect} from 'react-redux'
import AddReviewForm from './AddReviewForm'

const _SelectedLoc = ({selectedLoc,reviews, home})=>{
    const reviewPerLoc = reviews.filter((review)=>{
        return review.locationId==selectedLoc.id});

    return(
        <div id='location-view'>
            <a href={`#Home`} onClick={()=>home()}>Home</a><br />
            <img className='selected-img' src={selectedLoc.img} alt={selectedLoc.name} />
            <ul>
                {
                    reviewPerLoc.map((review)=>{
                        return(
                        <li key={review.id}>
                            <div className='current-list'>
                                <p>User: {review.userName}  Stars: {review.stars}</p>
                                <p>Wait Time: {review.waitTime}</p>
                                <p>Review: {review.review}</p>
                                <p>Created On: {review.createdAt.slice(0,10)}</p>
                            </div>
                        </li>
                    )})
                }

            </ul>

            <h2>Add a Review</h2>
            <AddReviewForm />
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
            home: ()=>{
                dispatch({
                    type: 'HOME',
                })
            }

    }
}

const SelectedLoc = connect(state=>state,mapDispatchToProps)(_SelectedLoc)
export default SelectedLoc;