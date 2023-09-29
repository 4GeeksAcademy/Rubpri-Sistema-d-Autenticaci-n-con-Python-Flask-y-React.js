import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");

	const handleClick = () => {

		const request = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					email: email,
					password: password
				}
			)
		};

		fetch('https://urban-couscous-5wx6jg9rg7qhj7v-3001.app.github.dev/api/token', request)
		.then(
			response => {
				if(response.status === 200)
					return response.json();
				else alert("There has been some error");
			}
		)
		.then(data => {
			console.log("This came from the backend", data)
			sessionStorage.setItem("token", data.access_token)
		})
		.catch(
			error => {
				console.log("Error!", error)
			}
		)

	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			
			{token && token != "" && token != undefined ? (
			
			"You are logged in with this token" + token 
			
			) : (  
			
			<div>
				<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
				<button onClick={handleClick}>Login</button>
			</div>
			
			)
			}

		</div>
	);
};
