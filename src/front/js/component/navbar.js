import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
					
					(
					<div>
					<Link to="/login">
						<button className="btn btn-primary me-3">Log in</button>
					</Link>

					<Link to="/signup">
						<button className="btn btn-primary me-3" >Signup</button>
					</Link>	
					
					<Link to="/private">
						<button className="btn btn-primary">Private</button>
					</Link>	

					</div>
					
					
					)
					: (

					<div>
						<Link to="/private">
						<button className="btn btn-primary me-3">Private</button>
						</Link>	
						<button onClick={() => actions.logout() } className="btn btn-primary">Logout</button>
					</div>
					)
					
					}
				</div>
			</div>
		</nav>
	);
};
