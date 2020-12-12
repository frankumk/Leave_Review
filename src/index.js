import React, { Component} from 'react'
import axios from 'axios'
import {render} from 'react-dom'
import {Provider } from 'react-redux'
import {createStore} from 'redux'

class _App extends Component{
    render(){
        return(
            <div>
                <h1>Take One, Leave One</h1>
            </div>
        )
    }
}

render(
    <Provider store={store}><App /></Provider>,document.querySelector('#root')
)