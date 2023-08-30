import Joi from 'joi';

export class joiSchema{
    
    static userSignupSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(12).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('student', 'instructor').required()
    });

    static userLoginSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    deviceID: Joi.string().min(5).max(15).required(),
    });

    static updateUserSchema = Joi.object({
        username: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(12),
        password: Joi.string().min(6),
        role: Joi.string().valid('student', 'instructor')
    });

    static resetPasswordSchema = Joi.object({
        otp: Joi.string().required(),
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    });

    static createCourseSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    courseFee: Joi.string().required(),
    totalModules: Joi.number().required(),
    });
    
    static createQuizSchema = Joi.object({
    courseId: Joi.string().required(),
    module: Joi.number().required(),
    questionNo: Joi.number().required(),
    title: Joi.string().required(),
    question: Joi.string().required(),
    options: Joi.array().items(Joi.string()).required(),
    correctOptionIndex: Joi.number().required(),
    });
    
    static submitQuizSchema = Joi.object({
    courseId: Joi.string().required(),
    module: Joi.number().required(),
    questionNo: Joi.number().required(),
    submittedIndex: Joi.number().required(),
    });

    static createAssignmentSchema = Joi.object({
        courseId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
    });

    static submitAssignmentSchema = Joi.object({
        assignmentID: Joi.string().required(),
        submissionText: Joi.string().required(),
    });

    static createForumPostSchema = Joi.object({
        courseId: Joi.string().required(),
        text: Joi.string().required(),
    });

    static updateForumPostSchema = Joi.object({
        courseId: Joi.string().required(),
        text: Joi.string().required(),
    });

    static RepliesSchema = Joi.object({
        courseId: Joi.string().required(),
        text: Joi.string().required(),
    });
}