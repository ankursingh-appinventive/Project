import express from 'express'
import { session } from '../middleware/auth';
import { quizCont } from '../controllers/quizCont';
import { validate } from '../middleware/validate';
const quizRouter = express.Router();

quizRouter.post("/createCourseQuiz", validate.validateCreateQuiz, session.instructorSessionCheck, quizCont.createCourseQuiz);
quizRouter.put("/updateCourseQuiz", session.instructorSessionCheck, quizCont.updateCourseQuiz);
quizRouter.delete("/deleteCourseQuiz/:id", session.instructorSessionCheck, quizCont.deleteCourseQuiz);
quizRouter.get('/getAllCourseQuiz/:id', session.instructorSessionCheck, quizCont.getAllCourseQuiz);
quizRouter.get("/getCourseQuizByInstructor/:id", session.instructorSessionCheck, quizCont.getCourseQuizByInstructor);
quizRouter.post('/getCourseQuizByStud', session.sessionCheck, quizCont.getCourseQuizByStud);
quizRouter.post('/submitQuizByStud', validate.validateSubmitQuiz, session.sessionCheck, quizCont.submitQuizByStud);

export default quizRouter;