import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req,res) {
  
    try{
        const{email,password,username}=req.body;
        if(!email || !password || !username){
           return  res.status(400).json({success:false,message:"All fields are required"});
        }

        // user can send abc@xyz as their email , so we need to validate it with the regular expression
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

        if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}

        const existingUserByEmail = await User.findOne({ email: email });

		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email already exists" });
		}

        const existingUserByUsername = await User.findOne({ username: username });

		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username already exists" });
		}



        const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

        // these images are in frontend folder 
		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];


        // it gives random image from the "PROFILE_PICS"
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		const newUser = new User({
			email:email,
			password: hashedPassword,
			username:username,
			image:image,
		});
        

        generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();


        // remove password from the reponse
		res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "",
			},
		});

    }
    catch(error){
        
        res.status(500).json({success:false,message:error.message})

    }
    
}

export async function login(req,res) {
   
    try{
        const{email,password}=req.body;
        if (!email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});

    }
    catch(error){
      
        res.status(500).json({success:false,message:"Internal sever error"});
        
    }
    
}

export async function logout(req,res) {
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"logged out successfully"})

    }
    catch(error){
        
        res.status(500).json({success:true,message:"internal server error"})
    }
    
}

export async function authCheck(req,res){
	

	



	try{
		res.status(200).json({success:true,user:req.user})

	}
	catch(error){
	
		res.status(500).json({success:false,message:"Internal server Error"})

	}
}