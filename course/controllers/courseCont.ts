import { courseService } from "../services/courseSer";
import { constants } from "../constants";

export class courseCont{

// CREATE COURSE
static createCourse =async (req:any, res:any, next:any) =>{
    try {
        const createResult = await courseService.createCourse(req.userId, req.body);
        if (createResult.success) {
          res.status(200).json({ message: constants.successMags.crsCreated, result: createResult.course });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// UPDATE COURSE
static updateCousrse = async (req:any, res:any, next:any) =>{
    try {
        const updateResult = await courseService.updateCourse(req.userId, req.body.courseID, req.body);
        if (updateResult.success) {
          res.status(200).json({ message: constants.successMags.crsUpdated, updatedCourse: updateResult.updatedCourse });
        } else if (updateResult.courseNotFound) {
          res.status(404).json({ message: constants.errorMsgs.crsError });
        } else if (updateResult.instructorMismatch) {
          res.status(400).json({ message: constants.warningMsgs.notAllowed });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// DELETE COURSE
static deleteCourse = async (req:any, res:any, next:any) =>{
    try {
        const deleteResult = await courseService.deleteCourse(req.userId, req.query.courseID);
    
        if (deleteResult.success) {
          res.status(200).json({ message: constants.successMags.crsDeleted, deletedCourse: deleteResult.deletedCourse });
        } else if (deleteResult.courseNotFound) {
          res.status(404).json({ message: constants.errorMsgs.crsError });
        } else if (deleteResult.instructorMismatch) {
          res.status(400).json({ message: constants.warningMsgs.notAllowed });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// GET ALL COURSE
static getAllCourse = async(req:any, res:any) =>{
    try {
        const findResult = await courseService.getAllCourse(req.userId);
        if (findResult.success) {
          res.status(200).json({ courses: findResult.courses });
        } else if (findResult.noCourses) {
          res.status(400).json({ message: constants.errorMsgs.crsError });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// GET COURSE BY ID
static getCourseByTittle = async(req:any, res:any) =>{
    try {
        const findResult = await courseService.getCourseByTitle(req.userId, req.query.title);
        if (findResult.success) {
          res.status(200).json({ course: findResult.course });
        } else if (findResult.noCourse) {
          res.status(400).json({ message: constants.errorMsgs.crsError });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// GET COURSE OF USER
static getCourseOfUser = async(req:any, res:any) =>{
    try {
        const findResult = await courseService.getCourseOfUser(req.userId);
        if (findResult.success) {
          res.status(200).json({ courses: findResult.courses });
        } else if (findResult.noCourses) {
          res.status(400).json({ message: constants.warningMsgs.notEnrolled });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// ENROLL COURSE
static enrollCourse =async (req:any, res:any, next:any) =>{
    try {
        const enrollResult = await courseService.enrollCourse(req.userId, req.query.id);
        if (enrollResult.success) {
          res.status(200).json({ message: constants.successMags.success, next : constants.successMags.payemet, enrollmentResult: enrollResult.result });
        } else if (enrollResult.notAllowed) {
          res.status(400).json({ message: constants.errorMsgs.error });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

// COURSE PAYMENT
static coursePayment =async (req:any, res:any, next:any) =>{
    try {
        const paymentResult = await courseService.coursePayment(req.query.user_id, req.query.id);
        if (paymentResult.success) {
          res.status(200).json({ message: constants.successMags.success, paymentResult: paymentResult.result });
        } else if (paymentResult.noCourse) {
          res.status(400).json({ message: constants.errorMsgs.crsError });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: constants.errorMsgs.error });
      }
} 

// GET  COURSE PROGRESS
static getProgress = async (req:any, res:any, next:any) =>{
    try {
        const progressResult = await courseService.getProgress(req.userId, req.params.id);
        if (progressResult.success) {
          res.status(200).json(progressResult.progress);
        } else if (progressResult.notEnrolled) {
          res.status(400).json({ message: constants.warningMsgs.notEnrolled });
        } else {
          res.status(500).json({ message: constants.errorMsgs.error });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: constants.errorMsgs.error });
      }
}

}