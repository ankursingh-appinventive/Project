export class constants {


     static errorMsgs = {
        error: 'Something went wrong',
        errorAss: 'Something went wrong in assignment',
        errorCrs: 'Something went wrong in course',
        errorPay: 'Something went wrong in course',
        errorPost : 'Something went wrong in post',
        errorQuiz : 'Something went wrong in quiz',
        errorUser : 'Something went wrong in user',
        assError : 'Assignment not found',
        crsError : 'Course not found',
        postEror : 'Forum post not found',
        quizEror : 'Quiz not found',
        userError : 'User not found',
        imgError : 'Image not found',
        otpError : 'Invalid OTP',
        passError : 'newPassword and confirmPassword must be same',
        authFailed : "Authorization failed",
        invalidToken : "Token expired or nat valid token",
    };


     static successMags = {
        success : 'Success',
        payemet: 'Please pay the course amount',
        assCreated : 'Assignment created successfully',
        assUpdated : 'Assignment updated successfully',
        assDeleted : 'Assignment deleted successfully',
        crsCreated : 'Course created successfully',
        crsUpdated : 'Course updated successfully',
        crsDeleted : 'Course deleted successfully',
        qzCreated : 'Course created successfully',
        qzUpdated : 'Course updated successfully',
        qzDeleted : 'Course deleted successfully',        
        otp : 'OTP sent successfully',
        alreadyVerified: 'Your email has already been verified. Please login to the app.',
        verified: 'Your email has been verified. Please login to the app.',
    };

    static warningMsgs = {
        notAllowed: 'Only the course instructor is allowed to aceess properties of the course',
        notEnrolled: 'You are not enrolled in the course',
        verifyMail: 'Please verify your mail',
    }

}