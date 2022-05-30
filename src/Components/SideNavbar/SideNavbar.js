import React from 'react'
import Logo from "../../Assets/images/logo.png"
import {NavLink} from "react-router-dom"
import "./styles.css"
import deals from "../../Assets/images/deals"
import contact from "../../Assets/images/contact"
import product from "../../Assets/images/product"
import Settings from "../../Assets/images/settings"
import Profile from "../../Assets/images/profile.jpeg"

function SideNavbar() {
  const routeLink = [
    {
      activeClassName: "is-active",
      to: "/deals",
      exact: true,
      image: deals,
      altImage: "De"
    },
    {
      activeClassName: "is-active",
      to: "/contacts",
      image: contact,
      altImage: "Co"
    },
    {
      activeClassName: "is-active",
      to: "/products",
      image: product,
      altImage: "Pro"
    },
    {
      activeClassName: "is-active",
      to: "/settings",
      image: Settings,
      altImage: "Set"
    },
  ]
  return (
    <section className='side-nav'>
      <div className='side-nav--logo'>
        <img className='company-logo' src={Logo} alt="company logo"/>
      </div>
      <div className='sidenav-profile'>
      <div className='side-nav--link'>
        {routeLink.map(link => <NavLink className={`navbar-item ${link.exact && "is-active"}`} {...link}>
          <div className='side-nav--icon'>{link.image() ? link.image() : link.altImage}</div>
        </NavLink>)}
      </div>
      <div >
        <img className='last-logo' src={Profile}/>
      </div>
      </div>
    </section>
  )
}

export default SideNavbar