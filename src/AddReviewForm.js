import React,{Component} from 'react'

class AddReviewForm extends Component{

    render(){
        return(
            <form id='add-review'>
                <label>Wait 
                    <input type='text' name='waitTime' id='waitTime' />
                </label><br />
                <label>Stars
                    <input type='text' name='stars' id='stars' />
                </label><br />
                <textarea id="leave-review" name='leave-review' rows='5' columns='300' placeholder="Review"/><br />
                <label>UserName
                    <input type='text' name='username' id='username' />
                </label><br />
                <button>Submit</button>
            </form>
        )
    }
}

export default AddReviewForm