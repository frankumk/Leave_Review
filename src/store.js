import {createStore} from 'redux'

const initialState = {
    categories: [],
    locations: [],
    reviews: [],
    view: '',
    selectedLoc: {},
    selectedCat: {},
    search: '',
    filteredLocations: [],
}
const store = createStore((state=initialState,action)=>{
    if(action.type==='LOAD'){
        state = {...state, reviews: action.reviews, locations: action.locations, categories: action.categories}
    }
    if(action.type==='SET_VIEW'){
        state = {...state, view: action.view}
    }
    if(action.type==='SET_CAT'){
        state={...state, selectedCat: action.cat}
    }
    if(action.type==='SET_LOC'){
        state={...state, selectedLoc: action.loc}
    }
    if(action.type==='SEARCH'){
        state = {...state, search: action.search}
        // state = {...state, search: action.search, filteredLocations: locations.filter((loc)=>loc.name===action.search)}
        // console.log(filteredLocations);
    }
    return state;
})

export default store