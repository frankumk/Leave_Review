import React,{Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id= 'search'>
                <form id='search-form'>
                    <label>Search:
                        <input id = 'searchbar' type = 'text' name='searchbar' placeholder = 'Search' value={this.props.search} onChange={(e)=>this.props.handleSearch(e)} />
                    </label>
                </form>
            </div>
        )
    }
}

export default Search;
