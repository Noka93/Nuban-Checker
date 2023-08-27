import { Form } from "./components/Form";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [profileDetails, setProfileDetails] = useState({});
	return (
		<div className="app">
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route
						path="/"
						element={<Form setProfileDetails={setProfileDetails} />}
					/>
					<Route
						path="/profile"
						element={
							<Profile
								profileDetails={
									profileDetails ? profileDetails : ""
								}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
