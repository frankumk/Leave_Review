import React from 'react'
import {connect} from 'react-redux'

const _SelectedLoc = ({selectedLoc,reviews})=>{
    const reviewPerLoc = reviews.filter((review)=>review.locationId==selectedLoc.id);

    return(
        <div id='location-view'>
            <a href={`#Home`}>Home</a>
            <img src={selectedLoc.img} alt={selectedLoc.name} />
            <h2>Add a Review</h2>
            <form id='add-review'>
            <textarea id="leave-review" name='leave-review' rows='5' columns='300' placeholder="Review"/><br />
                <label>UserName
                    <input type='text' name='username' id='username' />
                </label><br />
                <button>Submit</button>
            </form>
            <ul>
                {
                    reviewPerLoc.map((review)=>{
                        <li>
                            {review.userName}
                            {review.stars}
                            {review.review}
                            {review.waitTime}
                            {review.createdAt.slice(0,10)}

                        </li>
                    })
                }

            </ul>
        </div>
    )
}

const SelectedLoc = connect(state=>state)(_SelectedLoc)
export default SelectedLoc;