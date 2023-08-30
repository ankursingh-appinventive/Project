import { userSer } from '../services/userSer'
import { sessionSer } from '../services/sessionSer'
import { constants } from '../constants';
import dotenv from "dotenv";
dotenv.config();

export class userCont{

//SIGNUP
static register =async (req:any, res:any, next:any) =>{
  const userData = req.body;
  try {
    const registrationResult = await userSer.registerUser(userData);
    if (registrationResult.success) {
      res.status(201).json({
        user: registrationResult.user,
        message: constants.successMags.success
      });
    } else {
      res.status(401).json({message: constants.errorMsgs.error});
    }
  } catch (error) {
    res.status(500).json({ message: constants.errorMsgs.error });
  }
}

// VERIFY MAIL
static verifyMail = async(req, res) =>{
  const uid = req.query.id;
  try {
    const verificationResult = await userSer.verifyEmail(uid);
    if (verificationResult.alreadyVerified) {
      res.status(204).json({
        message: constants.successMags.alreadyVerified
      });
    }
    res.status(200).json({
      message: constants.successMags.verified
    });
  } catch (error) {
    res.status(500).json({ message: constants.errorMsgs.error });
  }
}

//LOGIN
static login = async (req:any, res:any, next:any) =>{
  const { username, password, deviceID } = req.body;
  try {
    const loginResult = await userSer.loginUser(username, password);
    if (!loginResult.user) {
      res.status(400).json({ message: constants.errorMsgs.userError });
    }
    if (!loginResult.user.verified) {
      res.status(401).json({ message: constants.warningMsgs.verifyMail });
    }
    await sessionSer.createSession(loginResult.user._id, deviceID);
    res.status(201).json({
      message: constants.successMags.success,
      user: loginResult.user,
      token: loginResult.token
    });
  } catch (error) {
    res.status(500).json({ message: constants.errorMsgs.error });
  }
}

// GET DETAILS 
static getProfile = async (req:any, res:any, next:any) =>{
  const uid = req.userId;
  try {
    const userProfile = await userSer.getUserProfile(uid);
    if (!userProfile) {
      res.status(404).json({message: constants.errorMsgs.userError});
    }
    res.status(200).json({message : userProfile});
  } catch (error) {
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

//UPDATE 
static updateProfile = async (req:any, res:any, next:any) =>{
  const uid = req.userId
  const userData = req.body;
  try {
    const updatedProfile = await userSer.updateUserProfile(uid, userData);
    if (!updatedProfile) {
      res.status(404).json({ message: constants.errorMsgs.userError });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

//UPLOAD PROFILE
static uploadProfilePic = async (req:any, res:any, next:any) =>{
  const uid = req.userId
  try {
    const uploadResult = await userSer.uploadProfilePic(uid, req.file);
    if (uploadResult.success) {
      res.status(200).json({ message: constants.successMags.success });
    } else if (uploadResult.noImage) {
      res.status(400).json({ message: constants.errorMsgs.imgError });
    } else if (uploadResult.noUser) {
      res.status(401).json({ message: constants.errorMsgs.userError });
    }
  } catch (error) {
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

// FORGET PASSWORD
static forgetPassword = async (req:any, res:any, next:any) =>{
  const uid = req.userId;
  try {
    const sendOTPRetult = await userSer.sendPasswordResetOTP(uid);
    if (sendOTPRetult.success) {
      res.status(200).json({ message: constants.successMags.otp });
    } else {
      res.status(401).json({message: constants.errorMsgs.error});
    }
  } catch (error) {
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

// FORGET PASSWORD WITH NUMBER
static forgetPasswordNum = async (req:any, res:any, next:any) =>{
const uid = req.userId;
try {
const sendOTPRetult = await userSer.sendPasswordResetOTPNum(uid);
if (sendOTPRetult.success) {
  res.status(200).json({ message: constants.successMags.otp });
} else {
  res.status(401).json({message: constants.errorMsgs.error});
}
} catch (error) {
res.status(500).json({message: constants.errorMsgs.error});
}
}

// RESET PASSWORD
static resetPassword = async (req:any, res:any, next:any) =>{
  const uid = req.userId;
  try {
    const { otp, newPassword, confirmPassword } = req.body;
    if(newPassword != confirmPassword){
      res.status(400).json({message: constants.errorMsgs.passError});
    }
    const resetResult = await userSer.resetPassword(uid, req.userEmail, otp, newPassword);
    if (resetResult.success) {
      res.status(200).json({ message: constants.successMags.success });
    } else if (resetResult.invalidOtp) {
      res.status(400).json({message: constants.errorMsgs.otpError});
    } else {
      res.status(401).json({message: constants.errorMsgs.error});
    }
  } catch (error) {
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

// LOGOUT
static logout = async (req:any, res:any, next:any) =>{
  const uid = req.userId;
  try {
    const logoutResult = await userSer.logoutUser(uid);
    if (!logoutResult.success) {
      res.status(401).send(logoutResult.message);
    }
    res.status(200).json({ message: constants.successMags.success });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: constants.errorMsgs.error});
  }
}

//DELETE
static deleteU = async (req:any, res:any, next:any) =>{
    const uid = req.userId
    try {
      const deletionResult = await userSer.deleteUserProfile(uid);
  
      if (deletionResult.success) {
        res.status(200).json({ message: constants.successMags.success });
      } else {
        res.status(404).json({ message: constants.errorMsgs.userError });
      }
    } catch (error) {
      res.status(500).json({message: constants.errorMsgs.error});
    }
}

}