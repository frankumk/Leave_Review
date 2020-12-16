import React from 'react'
import {connect} from 'react-redux'

const _Nav=({categories})=>{
    
    return (
        <div id="sidebar">
                    <h2>Choose a Category</h2>
                    <hr />
                    <ul id="sidebar-list">
                        <a href=''><li className='cat'>All</li></a>
                        {
                            categories.map(category=>{
                                return (
                                    <a href={`#${category.name}`} key={category.id}><li className='cat'>{category.name.toUpperCase()}</li></a>
                                )
                            })
                        }
                    </ul>
        </div>
    )

}
const Nav = connect(state=>state)(_Nav)
export default Nav;