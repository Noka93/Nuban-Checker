import "./profile.css";
import profile from "../assets/images/profile.jpg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Profile = ({ profileDetails }) => {
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate("/");
	};

	return (
		<div className="profile">
			<img src={profile} alt="" />
			<h2>Account Details</h2>
			<div className="details">
				<p>
					Account Name: <span>{profileDetails.account_name}</span>
				</p>
				<p>
					Account Number: <span>{profileDetails.account_number}</span>
				</p>
			</div>
			<button type="button" onClick={handleSubmit}>
				Back Home
			</button>
		</div>
	);
};
Profile.propTypes = {
	profileDetails: PropTypes.shape({
		account_name: PropTypes.string,
		account_number: PropTypes.string,
		// ... other prop types
	}),
};
