import {Link} from 'react-router-dom';


/**
 * This is just a simple example of navigation with bootstrap using router links
 */
export default function NavigationBar(){
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to={'/auth'} className='nav-link'>Auth</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={'/students'} className='nav-link'>Students</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    )
}