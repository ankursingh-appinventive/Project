import { Course } from '../models/courseMod';
import { Assignment } from "../models/assignmentMod";
import { Enrollment } from "../models/enrollementMod";
import { AssignmentSubmission } from "../models/assignmentsubmissionMod";
import { constants } from '../constants'

export class assignmentService{

    static createCourseAssignment = async (userId, assignmentData) => {
        try {
            const course = await Course.findOne({ _id: assignmentData.courseId });
            if (!course) {
                return { success: false };
            }
            if (course.instructorId !== userId) {
                return { success: false, notAllowed: true };
            }
            const newAssignment = new Assignment({
                courseId: assignmentData.courseId,
                instructorId: userId,
                title: assignmentData.title,
                description: assignmentData.description,
            });
            const createdAssignment = await newAssignment.save();
            const updatedCourse = await Course.findOneAndUpdate(
                { _id: assignmentData.courseId },
                { $push: { assignments: createdAssignment._id } },
                { new: true }
            );
            return { success: true, updatedCourse: updatedCourse, createdAssignment: createdAssignment };
        } catch (error) {
            console.error(error.message);
            throw new Error(constants.errorMsgs.errorAss);
        }
    };
    
    static updateAssignment = async (userId, courseID, assignmentData) => {
        try {
        const corInst = await Course.findOne({ _id: courseID });
        if (!corInst) {
            return { success: false };
        }
        if (corInst.instructorId !== userId) {
            return { success: false, notAllowed: true };
        }
        const updateAssignment = await Assignment.findOneAndUpdate(
            { _id: assignmentData.assignmentID },
            { $set: assignmentData },
            { new: true }
        );
        if (!updateAssignment) {
            return { success: false, assignmentNotFound: true };
        }    
        return { success: true, updatedAssignment: updateAssignment };
        } catch (error) {
        console.error(error.message);
        throw new Error(constants.errorMsgs.errorAss);
        }
    };

    static deleteAssignment = async (userId, assignmentID) => {
        try {
        const assInst = await Assignment.find({ instructorId: userId });
        let deletedAssignment;
        if (assInst) {
            deletedAssignment = await Assignment.findOneAndRemove({ _id: assignmentID });
        } else {
            return { success: false, notAllowed: true };
        }   
        if (!deletedAssignment) {
            return { success: false, assignmentNotFound: true };
        }
        return { success: true, deletedAssignment: deletedAssignment };
        } catch (error) {
        console.error(error.message);
        throw new Error(constants.errorMsgs.errorAss);
        }
    };

    static getAllAssignments = async (userId, courseID) => {
        try {
          const findAssignment = await Assignment.find({ courseId: courseID, instructorId: userId });
          if (findAssignment && findAssignment.length > 0) {
            return { success: true, assignments: findAssignment };
          } else {
            return { success: false, notAllowed: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorAss);
        }
    };

    static getAssignmentById = async (userId, assignmentID) => {
        try {
        const findAssignment = await Assignment.findOne({ _id: assignmentID, instructorId: userId });
        if (findAssignment) {
            return { success: true, assignment: findAssignment };
        } else {
            return { success: false, notAllowed: true };
        }
        } catch (error) {
        throw new Error(constants.errorMsgs.errorAss);
        }
    };

    static getAssignmentByStudent = async (userId, assignmentID) => {
        try {
          const assignment = await Assignment.findOne({ _id: assignmentID });
          if (!assignment) {
            return { success: false };
          }
          const stud = await Enrollment.findOne({ userId: userId, courseId: assignment.courseId, payment: true });
          if (stud) {
            return { success: true, assignment: assignment };
          } else {
            return { success: false, notEnrolled: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorAss);
        }
    };

      static submitAssignment = async (userId, assignmentData) => {
        try {
          const assignment = await Assignment.findOne({ _id: assignmentData.assignmentID });
          if (!assignment) {
            return { success: false };
          }
          const stud = await Enrollment.findOne({ userId: userId, courseId: assignment.courseId, payment: true });
          if (stud) {
            const newAssignmentsub = new AssignmentSubmission({
              assignmentId: assignmentData.assignmentID,
              userId: userId,
              submissionText: assignmentData.submissionText
            });
            const submission = await newAssignmentsub.save();
            return { success: true, submission: submission };
          } else {
            return { success: false, notEnrolled: true };
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(constants.errorMsgs.errorAss);
        }
    };

}