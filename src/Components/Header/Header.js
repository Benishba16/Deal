import React from 'react'
import Filter from "../../Assets/images/filter"
import DropDown from "../../Assets/images/dropDown"
import Add from "../../Assets/images/add"
import "./styles.css"
import GroupButton from '../GroupButton/GroupButton'
import Kanban from "../../Assets/images/kanban"
import List from "../../Assets/images/list"

function Header() {
  return (
    <section className='deals-container'>
        <section className='deals-header'>
            <div className='deals-data'>
                <div className='deals-filter'>{Filter(20, 20)}</div>
                <div className='divider'>
                    <div className='deals-heading'>General Pipeline</div>
                    <div className='deals-dropdown'>{DropDown(15, 15)}</div>
                </div>
                <div className='divider1'>
                    <div className='deals-heading1'>All Deals</div>
                    <div className='deals-dropdown1'>{DropDown(15, 15)}</div>
                </div>
            </div>
                <div className='deals-buttons'>
                <div className='group-btn-wrapper'>
                    <div className='group-kanban'>{Kanban(25, 25, "#fff")}</div>
                    <div className='group-list'>{List(50, 50, "#272937")}</div>
                </div>
                    <span className='deals-import'>Import</span>
                    <span className='deals-add'>
                        <span className='deals-add-logo'>{Add(20, 20)}</span>
                        <span>New Deal</span>
                    </span>
                </div>
        </section>
    </section>
  )
}

export default Header