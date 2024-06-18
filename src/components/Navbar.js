import React from 'react'
import { Link } from 'react-router-dom'
const Navbar =()=>{
    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{color:'red'}}>NewsWorld</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <href className="nav-link active" aria-current="page" to="/" style={{color:'blue'}}>Home</href>
        </li>
        <li className='nav-item'><Link className='nav-link' to='/business'>Business</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/entartainment'>Entartainment</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/general'>General</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/health'>Health</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/science'>Science</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/sports'>Sports</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/technology'>Technology</Link></li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className="nav-link favorites-link" to="/favorites">
                  Favorites
              </Link>
          </li>
      </ul>
    </div>
  </div>
</nav>
      </div>
    )
}
export default Navbar