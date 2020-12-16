import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class _AddReviewForm extends Component{
    constructor(){
        super()
        this.state = {
            waitTime: '',
            stars: '',
            review: '',
            username: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changingForm = this.changingForm.bind(this);
    }
    changingForm(e){
        const target = e.target;
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const stars = parseInt(this.state.stars);
        const waitTime = parseInt(this.state.waitTime);
        const review=this.state.review;
        const username = this.state.username;
        if(isNaN(stars) || isNaN(waitTime)){
            alert('Wait time and stars must be a number');
            return 
        }
        this.props.create(waitTime,stars,review,username,this.props.selectedLoc.id);
        this.setState({
            waitTime: '',
            stars: '',
            review: '',
            username: '',
        })
        Array.from(document.querySelectorAll('input')).forEach(input=>input.value='');
        document.getElementById('review').value='';
    }
    render(){
        return(
            <form id='add-review'>
                <label>Wait 
                    <input type='text' name='waitTime' id='waitTime' value={this.state.waitTime} onChange={(e)=>this.changingForm(e)} />
                </label><br />
                <label>Stars
                    <input type='text' name='stars' id='stars' value={this.state.stars} onChange={(e)=>this.changingForm(e)}/>
                </label><br />
                <textarea type='text' id='review' name='review' rows='5' columns='300' placeholder='Review' defaultValue={this.state.review} onChange={(e)=>this.changingForm(e)}></textarea><br />
                <label>UserName
                    <input type='text' name='username' id='username' defaultValue={this.state.userName} onChange={(e)=>this.changingForm(e)} />
                </label><br />
                <button id='submit' type='submit' onClick = {(e)=>this.handleSubmit(e)}>Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
            create: async(waitTime,stars,review,userName,locationId)=>{
                const dataRev= (await axios.post('/api/reviews',{waitTime, stars, review, userName,locationId})).data;
                dispatch({
                    type: 'CREATE_REVIEW',
                    dataRev
                })
            }

    }
}


const AddReviewForm = connect(state=>state,mapDispatchToProps)(_AddReviewForm)
export default AddReviewForm