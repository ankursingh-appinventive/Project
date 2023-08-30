import express from 'express'
import { session } from '../middleware/auth';
import { userCont } from '../controllers/userCont';
import { validate } from '../middleware/validate';
import  middlewaremulter from '../middleware/multer';
const userRouter = express.Router();

userRouter.get("/",(req, res) => {
    res.status(200).json({message: "This is home page for E_Learning"});
})

userRouter.post("/signup", validate.validateUserSignup, userCont.register);
userRouter.get('/verify', userCont.verifyMail);
userRouter.post("/login", validate.validateUserLogin, userCont.login);
userRouter.get('/getProfie', session.sessionCheck, userCont.getProfile);
userRouter.delete("/delete", session.sessionCheck, userCont.deleteU);
userRouter.get("/logout", session.sessionCheck, userCont.logout);
userRouter.put("/updateProfile", validate.validateUpdateUser,session.sessionCheck, userCont.updateProfile);
userRouter.put("/uploadProfilePic", session.sessionCheck, middlewaremulter.upload.single("image"), userCont.uploadProfilePic);
userRouter.get("/forgetPassword", session.sessionCheck, userCont.forgetPassword);
userRouter.get("/forgetPasswordNumber", session.sessionCheck, userCont.forgetPasswordNum);
userRouter.post("/resetPassword", validate.validateResetPassword, session.sessionCheck, userCont.resetPassword);

export default userRouter;