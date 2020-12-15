import React, { Component} from 'react'
import axios from 'axios'
import {render} from 'react-dom'
import {Provider } from 'react-redux'
import {connect} from 'react-redux'
import Nav from './Nav'
import Places from './Places'
import Search from './Search'
import store from './store'
import SelectedLoc from './SelectedLoc'


class _App extends Component{
    constructor(){
        super(),
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.props.getReviews()
    }

    handleSearch(e){
        console.log(e.target.value)
        this.props.updateSearch(e.target.value.toLowerCase())
        console.log(this.props.search)
        //this.setState({search: e.target.value.toLowerCase()});
        //console.log(this.state.search);
    }

    render(){
        const {search,selectedLoc}=this.props
        return(
            <div>
                <div id='header'>
                    <h1>Meter</h1>
                    <p>Check the line before you go. Leave a review.</p>
                    <Search search={search} handleSearch={this.handleSearch}/>
                </div>
                <div id='format'>
                    <Nav />
                    <Places /> 
                </div>
            </div>
        )
    }
}

const App = connect(
    state=>state,
    (dispatch)=>{
        return {
            getReviews: async()=>{
                const reviews = (await axios.get('/api/reviews')).data
                const locations = (await axios.get('/api/locations')).data
                const categories = (await axios.get('/api/categories')).data
                dispatch({
                    type: 'LOAD',
                    reviews,
                    locations,
                    categories
                })
            },
            updateSearch: (search)=>{
                dispatch({
                    type: 'SEARCH',
                    search
                })
            }

        }
    }
)(_App);

render(
    <Provider store={store}><App /></Provider>,document.querySelector('#root')
)