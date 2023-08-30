import { quizService } from '../services/quizSer';
import { constants } from '../constants';

export class quizCont{

    // CREATE COURSE QUIZ
    static createCourseQuiz =async (req:any, res:any, next:any) =>{
        try {
            const uid = req.userId;
            const quizData = req.body;
            const createdQuiz = await quizService.createCourseQuiz(uid, quizData);        
            res.status(200).json({message: constants.successMags.qzCreated,createdQuiz});
          } catch (error) {
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // UPDATE COURSE QUIZ
    static updateCourseQuiz = async (req:any, res:any, next:any) =>{
        try {
            const uid = req.userId;
            const quizData = req.body;
            const updateQuiz = await quizService.updateCourseQuiz(uid, quizData);
            if (updateQuiz) {
              res.status(200).json(updateQuiz);
            } else {
              res.status(404).json({ message : constants.errorMsgs.quizEror });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // DELETE COURSE QUIZ
    static deleteCourseQuiz = async (req:any, res:any, next:any) =>{
        try {
            const uid = req.userId;
            const quizID = req.params.id;
            const deleteResult = await quizService.deleteCourseQuiz(uid, quizID);
        
            if (deleteResult.deletedQuiz) {
              res.status(200).json({ message : constants.successMags.success, deletedQuiz: deleteResult.deletedQuiz });
            } else if (deleteResult.isInstructor) {
              res.status(404).json({ message : constants.errorMsgs.quizEror });
            } else {
              res.status(400).json({ message : constants.warningMsgs.notAllowed });
            }
          } catch (error) {
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // GET ALL COURSE QUIZ
    static getAllCourseQuiz = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const courseID = req.params.id;
            const quizzes = await quizService.getAllCourseQuiz(uid, courseID);
            if (quizzes) {
              res.status(200).json({
                message : constants.successMags.success,
                quizzes
              });
            } else {
              res.status(400).json({
                message : constants.errorMsgs.quizEror,
                OR: constants.warningMsgs.notAllowed
              });
            }
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // GET  COURSE QUIZ BY INSTRUCTOR
    static getCourseQuizByInstructor = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const quizID = req.params.id;
            const quiz = await quizService.getCourseQuizByInstructor(uid, quizID);
        
            if (quiz) {
              res.status(200).json({
                message : constants.successMags.success,
                quiz
              });
            } else {
              res.status(400).json({
                message : constants.errorMsgs.quizEror,
                OR: constants.warningMsgs.notAllowed
              });
            }
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // GET  COURSE QUIZ BY STUDENT
    static getCourseQuizByStud = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const { courseId, module, questionNo } = req.body;
            const quiz = await quizService.getCourseQuizByStud(uid, courseId, module, questionNo);
        
            if (!quiz) {
              res.status(404).json({ message : constants.errorMsgs.quizEror });
            } else {
              res.status(200).json(quiz);
            }
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }

    // SUBMIT COURSE QUIZ BY STUDENT
    static submitQuizByStud = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const { courseId, module, questionNo, submittedIndex } = req.body;
            const result = await quizService.submitQuizByStud(uid, courseId, module, questionNo, submittedIndex);
            res.status(200).json(result);
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ message : constants.errorMsgs.error });
          }
    }
    
}
