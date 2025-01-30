
const User = require("../models/User");
const Otp = require("../models/OTP");
const bcrypt = require("bcryptjs");
const {ApiResponse} = require("../utils/ApiResponse");
const {generateToken} = require("../utils/generateToken");
const { generateOtp } = require("../utils/generateOtp");
exports.loginController = async (req, res) => {
    // const {phNo,password} = req.body;
    try {
        const existingUser = await User.findOne({ phNo: req.body.phNo });
	console.log("Existing User", existingUser);

        if (
			existingUser &&
			(await bcrypt.compare(req.body.password, existingUser.password))
		) {
			
			const loginedUser = ApiResponse(existingUser);

			
			const token = await generateToken(loginedUser);
			
			console.log("Token ", token);
            existingUser.token = token;
            res.cookie("token", token, {
               
                maxAge: new Date(
                    Date.now() +
                        parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
                ),
                httpOnly: true,
                secure: process.env.PRODUCTION === "true" ? true : false,
            });
			return res.status(200).json(ApiResponse(existingUser));
        }else{
			return res.status(404).json({ message: "Invalid credentials" });
		}

    } catch (error) {
        console.error("Error logging in:", error.message);
		return res.status(500).json({ message: "Internal server error" });

    }   
}

exports.signUpController = async (req, res) => {
    try {
		const existingUser = await User.findOne({ phNo : req.body.phNo });

		// if user already exists
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// hashing the password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		req.body.password = hashedPassword;

		// creating new user
		const createdUser = new User(req.body);
		await createdUser.save();

		// getting secure user info
		const user = ApiResponse(createdUser);

		// generating jwt token
		const token = generateToken(user);

		// sending jwt token in the response cookies
		res.cookie("token", token, {
			
			maxAge: new Date(
				Date.now() +
					parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
			),
			httpOnly: true,
			secure: process.env.PRODUCTION === "true" ? true : false,
		});

		return res.status(201).json(ApiResponse(createdUser));
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Error occured during signup, please try again later" });
	}
}
exports.verifyOtp = async (req, res) => {
	try {
		// checks if user id is existing in the user collection
		const isValidUserId = await User.findOne({phNo : req.body.phNo});

		// if user id does not exists then returns a 404 response
		if (!isValidUserId) {
			return res.status(404).json({
				message: "User not Found, for which the otp has been generated",
			});
		}

		
		

		if (!isOtpExisting) {
			return res.status(404).json({ message: "Otp not found" });
		}

	
		// if (isOtpExisting.expiresAt < new Date()) {
		// 	await Otp.findByIdAndDelete(isOtpExisting._id);
		// 	return res.status(400).json({ message: "Otp has been expired" });
		// }

	
		// if (
		// 	isOtpExisting &&
		// 	(await bcrypt.compare(req.body.otp, isOtpExisting.otp))
		// ) {
		// 	await Otp.findByIdAndDelete(isOtpExisting._id);
		// 	const verifiedUser = await User.findByIdAndUpdate(
		// 		isValidUserId._id,
		// 		{ isVerified: true },
		// 		{ new: true }
		// 	);


	// }
			const otp = req.body.otp;
			return res.status(200).json(otp);


		  
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Some Error occured" });
	}
};
exports.generateOtp = async (req, res) => {
	try {
		const otp = generateOtp(req.body.phNo);
		console.log("This is the generated otp", otp);
		const newOtp = new Otp({
	
			otp: otp,
			expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
		});
		await newOtp.save();
		return res.status(201).json({ message: "OTP sent",newOtp : newOtp });


	}
	catch (error) {
		console.log(error);
	}
};
/*
exports.resendOtp = async (req, res) => {
	try {
		const existingUser = await User.findById(req.body.phNo);

		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		await Otp.deleteMany({ user: existingUser._id });

		const otp = generateOtp(existingUser.phNo);
		console.log("This is the generated otp", otp);

		const newOtp = new Otp({
			user: req.body.phNo,
			otp: otp,
			expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
		});
		await newOtp.save();

		

		return res.status(201).json({ message: "OTP sent",newOtp : newOtp });
	} catch (error) {
		return res.status(500).json({
			message: "Some error occured while resending otp, please try again later",
		});
		console.log(error);
	}
};
*/
exports.logout = async (req, res) => {
	try {
		res.cookie("token", {
			maxAge: 0,
			sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
			httpOnly: true,
			secure: process.env.PRODUCTION === "true" ? true : false,
		});
		return res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.log(error);
	}
};