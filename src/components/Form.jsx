import { useEffect, useState } from "react";
import "./reusables.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

export const Form = ({ setProfileDetails }) => {
	const navigate = useNavigate();

	const [bankList, setBankList] = useState([]);
	const [bankCode, setBankCode] = useState(0);
	const [accoutNumber, setAccountNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const apiKey = import.meta.env.VITE_API_KEY;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// alert("Account Validation Successful");
		setIsLoading(true);
		const response = await axios
			.get(
				`https://api.paystack.co/bank/resolve?account_number=${accoutNumber}&bank_code=${bankCode}`,
				{
					headers: {
						Authorization: `Bearer ${apiKey}`,
					},
				}
			)
			.catch((error) => {
				console.log(error);
				toast.error("Invalid Account Details!");
				setIsLoading(isLoading);
			});
		setProfileDetails(response.data.data);
		toast.success("Account retrieved successfully");

		if (response.data.status === true) {
			navigate("/profile");
		}
	};

	const getBanks = async () => {
		const response = await axios.get("https://api.paystack.co/bank", {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
		setBankList(response.data.data);
	};

	useEffect(() => {
		getBanks();
	});

	return (
		<form onSubmit={handleSubmit}>
			<div className="header">
				<h1>NUBAN Checker ✔</h1>
				<p>Enter your Account Number</p>
			</div>

			<input
				type="number"
				id="accountNumber"
				name="accountNumber"
				placeholder="Enter Account Number"
				value={accoutNumber}
				onChange={(e) => setAccountNumber(e.target.value)}
			/>
			<label htmlFor="bankList">Select Bank</label>
			<select
				name="bankList"
				id="bankList"
				onChange={(e) => setBankCode(e.target.value)}
			>
				{bankList.map((bank) => (
					<option key={bank.id} value={bank.code}>
						{bank.name}
					</option>
				))}
				{/* <option value="2">GTB</option>
				<option value="3">Union</option> */}
			</select>
			<button
				type="submit"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				{isLoading ? (
					<Oval
						height={30}
						width={30}
						color="#fff"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#4fa94d"
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				) : (
					"Validate Account"
				)}
			</button>
		</form>
	);
};

Form.propTypes = {
	setProfileDetails: PropTypes.func.isRequired,
};
