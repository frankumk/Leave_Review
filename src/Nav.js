import React, {Component} from 'react'
import {connect} from 'react-redux'

class _Nav extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

          window.addEventListener('hashchange', ()=> {
              //console.log(window.location.hash.slice(1))
            this.props.selectCat(window.location.hash.slice(1));
          })
          //this.props.selectCat(window.location.hash.slice(1));
    }


    render(){
    return (
        <div id="sidebar">
                    <h2>Choose a Category</h2>
                    <hr />
                    <ul id="sidebar-list">
                        <a href=''><li className='cat'>All</li></a>
                        {
                            this.props.categories.map(category=>{
                                return (
                                    <a href={`#${category.id}`} key={category.id} onClick={()=>this.props.home()}><li className='cat'>{category.name.toUpperCase()}</li></a>
                                )
                            })
                        }
                    </ul>
        </div>
    )
}

}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCat: (cat)=>{
            dispatch({
                type: 'SET_CAT',
                cat
            })
        },
        home: ()=>{
            dispatch({
                type: 'HOME',
            })
        }
    }
}
const Nav = connect(state=>state,mapDispatchToProps)(_Nav)
export default Nav;