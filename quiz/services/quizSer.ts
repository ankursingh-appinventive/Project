import { Course } from '../models/courseMod';
import { Quiz } from "../models/quizMod";
import { Enrollment } from "../models/enrollementMod";
import ProgressModel from "../models/progressMod";
import { constants } from '../constants';

export class quizService {

    static createCourseQuiz = async (instructorId, quizData) => {
        try {
          const course = await Course.findOne({ _id: quizData.courseId });
          if (!course) {
            return null;
          }      
          if (course.instructorId.toString() === instructorId) {
            const newQuiz = new Quiz({
              courseId: quizData.courseId,
              instructorId: instructorId,
              module: quizData.module,
              questionNo: quizData.questionNo,
              title: quizData.title,
              question: quizData.question,
              options: quizData.options,
              correctOptionIndex: quizData.correctOptionIndex
            });      
            const result = await newQuiz.save();      
            const updatedCourse = await Course.findOneAndUpdate(
              { _id: quizData.courseId },
              { $push: { quizzes: result._id } },
              { new: true }
            );      
            return {
              message : constants.successMags.success,
              COURSE: updatedCourse,
              QUIZ: result
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          throw new Error(constants.errorMsgs.errorQuiz);
        }
    };

    static updateCourseQuiz = async (instructorId, quizData) => {
    try {
        const course = await Course.findOne({ _id: quizData.courseID });
        if (!course) {
        return null;
        }
    
        if (course.instructorId.toString() === instructorId) {
        const updateQuiz = await Quiz.findOneAndUpdate(
            { _id: quizData.quizID },
            { $set: quizData },
            { new: true }
        );
    
        return updateQuiz
            ? { message : constants.successMags.success, updateQuiz }
            : null;
        } else {
        return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error(constants.errorMsgs.errorQuiz);
    }
    };


    static deleteCourseQuiz = async (instructorId, quizID) => {
        try {
        const quizInst = await Quiz.findOne({ _id: quizID, instructorId });
    
        if (!quizInst) {
            return { isInstructor: false, deletedQuiz: null };
        }
    
        const deletedQuiz = await Quiz.findOneAndRemove({ _id: quizID });
    
        return { isInstructor: true, deletedQuiz };
        } catch (error) {
        console.error(error);
        throw new Error(constants.errorMsgs.errorQuiz);
        }
    };

    static getAllCourseQuiz = async (instructorId, courseID) => {
        try {
          const findQuiz = await Quiz.find({ courseId: courseID, instructorId: instructorId });
          return findQuiz;
        } catch (error) {
          console.error(error);
          throw new Error(constants.errorMsgs.errorQuiz);
        }
    };

    static getCourseQuizByInstructor = async (instructorId, quizID) => {
        try {
          const findQuiz = await Quiz.findOne({ _id: quizID, instructorId: instructorId });
          return findQuiz;
        } catch (error) {
          console.error(error);
          throw new Error(constants.errorMsgs.errorQuiz);
        }
    };

    
    static getCourseQuizByStud = async (userId, courseId, module, questionNo) => {
        try {
        const enrollUser = await Enrollment.findOne({ courseId, userId, payment: true });
    
        if (enrollUser) {
            const quiz = await Quiz.findOne({ courseId, module, questionNo }).select('-correctOptionIndex');
            return quiz;
        } else {
            return null;
        }
        } catch (error) {
        console.error(error);
        throw new Error(constants.errorMsgs.errorQuiz);
        }
    };

    static submitQuizByStud = async (userId, courseId, module, questionNo, submittedIndex) => {
        try {
          const enrollUser = await Enrollment.findOne({ courseId, userId, payment: true });
      
          if (enrollUser) {
            const quiz = await Quiz.findOne({ courseId, module, questionNo });
      
            if (!quiz) {
              return { message : constants.errorMsgs.quizEror };
            }
      
            const isAnswerCorrect = submittedIndex == quiz.correctOptionIndex;
      
            if (isAnswerCorrect) {
              const getProgress = await ProgressModel.findOne({ userId, courseId });
              const currsentScore = getProgress.score + 5;
              await ProgressModel.findOneAndUpdate(
                { userId, courseId },
                { $set: { score: currsentScore } },
                { new: true }
              );
            }      
            return { isAnswerCorrect };
          } else {
            return { message : constants.warningMsgs.notEnrolled };
          }
        } catch (error) {
          console.error(error);
          throw new Error(constants.errorMsgs.errorQuiz);
        }
      };

}