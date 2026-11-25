import React from 'react'
import { NavLink } from 'react-router'

function LibraryHeader() {
  return (
    <div>
      <header>
        <h1>LIBRARY MANAGEMENT SYSTEM</h1>
        <p>this is library management system</p>
      </header>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>
          Login / Register
        </NavLink>
        <NavLink to="/Books" className={({ isActive }) => isActive ? 'active' : undefined}>
          Books
        </NavLink>
        <NavLink to="/Office" className={({ isActive }) => isActive ? 'active' : undefined}>
          Offices
        </NavLink>
      </nav>
    </div>
  )
}

export default LibraryHeader