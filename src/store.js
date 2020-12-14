import {createStore} from 'redux'

const initialState = {
    categories: [],
    locations: [],
    reviews: []
}
const store = createStore((state=initialState,action)=>{
    if(action.type==='LOAD'){
        state = {...state, reviews: action.reviews, locations: action.locations, categories: action.categories}
    }
    return state;
})

export default store