import { Course } from '../models/courseMod';
import { User } from "../models/userMod";
import { Assignment } from "../models/assignmentMod";
import { Quiz } from "../models/quizMod";
import PaymentModel from "../models/paymentMod";
import { Enrollment } from "../models/enrollementMod";
import ProgressModel from "../models/progressMod";
import { constants } from '../constants';
import { mail } from './emailSer';

export class courseService{

    static createCourse = async (instructorId, courseData) => {
      try {
          const newCourse = new Course({
          title: courseData.title,
          category: courseData.category,
          instructorId: instructorId,
          description: courseData.description,
          courseFee: courseData.courseFee,
          totalModules: courseData.totalModules
          });
          const result = await newCourse.save();
          return { success: true, course: result };
      } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
      }
    };

    static updateCourse = async (instructorId, courseID, courseData) => {
        try {
        const courseInst = await Course.findOne({ $and: [{ _id: courseID }, { instructorId: instructorId }] });
        if (!courseInst) {
            return { success: false, instructorMismatch: true };
        }
        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseID }, { $set: courseData }, { new: true });
        if (!updatedCourse) {
            return { success: false, courseNotFound: true };
        }
        return { success: true, updatedCourse: updatedCourse };
        } catch (error) {
        console.error(error.message);
        throw new Error(constants.errorMsgs.errorCrs);
        }
    };
  
    static deleteCourse = async (instructorId, courseID) => {
        try {
        const courseInst = await Course.findOne({ $and: [{ _id: courseID }, { instructorId: instructorId }] });    
        if (!courseInst) {
            return { success: false, instructorMismatch: true };
        }    
        await Assignment.deleteMany({ _id: { $in: courseInst.assignments } });
        await Quiz.deleteMany({ _id: { $in: courseInst.quizzes } });
        const deletedCourse = await Course.findOneAndRemove({ _id: courseID });    
        if (!deletedCourse) {
            return { success: false, courseNotFound: true };
        }    
        return { success: true, deletedCourse: deletedCourse };
        } catch (error) {
        console.error(error.message);
        throw new Error(constants.errorMsgs.errorCrs);
        }
    };

    static getAllCourse = async (userId) => {
        try {
          const user = await User.findOne({ _id: userId });
          if (!user) {
            return { success: false };
          }
          const findCourses = await Course.find({});      
          if (findCourses && findCourses.length > 0) {
            return { success: true, courses: findCourses };
          } else {
            return { success: true, noCourses: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
        }
      };

      static getCourseByTitle = async (userId, courseTitle) => {
        try {
          const user = await User.findOne({ _id: userId });      
          if (!user) {
            return { success: false };
          }      
          const findCourse = await Course.findOne({ title: courseTitle });      
          if (findCourse) {
            return { success: true, course: findCourse };
          } else {
            return { success: true, noCourse: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
        }
      };

      static getCourseOfUser = async (userId) => {
        try {
          const user = await User.findOne({ _id: userId });      
          if (!user) {
            return { success: false };
          }      
          const findCourses = await Enrollment.find({ userId: userId });      
          if (findCourses && findCourses.length > 0) {
            return { success: true, courses: findCourses };
          } else {
            return { success: true, noCourses: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
        }
      };

      static enrollCourse = async (userId, courseId) => {
        try {
          const user = await User.findOne({ _id: userId });      
          if (!user) {
            return { success: false, notAllowed: true };
          }      
          const course = await Course.findOne({ _id: courseId });  
          let result    
          if (!course) {
            return { success: false, notAllowed: true };
          }else{
            const enrolled = new Enrollment({
              userId: userId,
              courseId: courseId,
              title: course.title,
              enrollmentDate: Date.now(),
            });      
            result = await enrolled.save();
          }   
          if (result) {
            mail.sendEnrollPaymentMail(user._id, user.username, user.email, course.title, course.courseFee, course._id);
            return { success: true, result: result };
          } else {
            return { success: false };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
        }
      };

      static coursePayment = async (userId, courseId) => {
        try {
          const user = await User.findOne({ _id: userId });      
          if (!user) {
            return { success: false };
          }      
          const findCourse = await Course.findOne({ _id: courseId });      
          if (!findCourse) {
            return { success: false, noCourse: true };
          }      
          const payment = new PaymentModel({
            userId: userId,
            courseId: courseId,
            amount: findCourse.courseFee,
            paymentDate: Date.now(),
          });      
          await Enrollment.findOneAndUpdate({ courseId: courseId }, { $set: { payment: true } });      
          const progress = new ProgressModel({
            userId: userId,
            courseId: courseId,
            totalModules: findCourse.totalModules,
          });      
          await progress.save();      
          const result = await payment.save();
          return { success: true, result: result };
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorPay);
        }
      };

      static getProgress = async (userId, courseId) => {
        try {
          const user = await User.findOne({ _id: userId });
          if (!user) {
            return { success: false };
          }
          const findEnrollment = await Enrollment.findOne({ courseId: courseId, userId: userId });
          if (!findEnrollment) {
            return { success: false, notEnrolled: true };
          }
          const getProgress = await ProgressModel.findOne({ userId: userId, courseId: courseId });
          return { success: true, progress: getProgress };
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorCrs);
        }
      };
      

}