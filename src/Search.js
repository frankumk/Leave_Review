import React from 'react'
import {connect} from 'react-redux'

const _Search=({locations, search})=>{
    return(

        <input type='text' id='search' placeholder='search' name='search'/>
    )
}

const Search = connect(state=>state)(_Search)
export default Search;
