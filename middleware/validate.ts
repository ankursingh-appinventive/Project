import { joiSchema } from './joiSchema';

export class validate{

  static validateUserSignup =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.userSignupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  static validateUserLogin =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.userLoginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  static validateUpdateUser =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.userSignupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  static validateResetPassword =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  static validateCreateCourse =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.createCourseSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateCreateQuiz =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.createQuizSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateSubmitQuiz =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.submitQuizSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateCreateAssignment =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.createAssignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateSubmitAssignment =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.submitAssignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateCreateForumPost =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.createForumPostSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  static validateUpdateForumPost =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.updateForumPostSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };  

  static validateReplies =async (req:any, res:any, next:any) =>{
    const { error } = joiSchema.RepliesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

}