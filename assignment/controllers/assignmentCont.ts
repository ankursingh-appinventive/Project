import { assignmentService } from '../services/assignmentSer';
import { constants } from '../constants';

export class assignmentCont{

    // CREATE COURSE ASSIGNMENT
    static createCourseAssignment =async (req:any, res:any, next:any) =>{
        try {
            const assignmentResult = await assignmentService.createCourseAssignment(req.userId, req.body);
            if (assignmentResult.success) {
              res.status(200).json({
                message: constants.successMags.assCreated,
                course: assignmentResult.updatedCourse,
                assignment: assignmentResult.createdAssignment
              });
            } else if (assignmentResult.notAllowed) {
              res.status(400).json({ message: constants.warningMsgs.notAllowed });
            } else {
              res.status(500).json({ message: constants.errorMsgs.error });
            }
          } catch (error) {
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // UPDATE COURSE ASSIGNMENT
    static updateAssignment = async (req:any, res:any, next:any) =>{
        try {
            const assignmentResult = await assignmentService.updateAssignment(req.userId, req.params.courseId, req.body);
            if (assignmentResult.success) {
              res.status(200).json({ message: constants.successMags.assUpdated, updatedAssignment: assignmentResult.updatedAssignment });
            } else if (assignmentResult.notAllowed) {
              res.status(400).json({ message: constants.warningMsgs.notAllowed });
            } else if (assignmentResult.assignmentNotFound) {
              res.status(404).json({ message: constants.errorMsgs.assError });
            } else {
              res.status(500).json({ message: constants.errorMsgs.error });
            }
          } catch (error) {
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // DELETE COURSE ASSIGNMENT
    static deleteAssignment = async (req:any, res:any, next:any) =>{
        try {
            const assignmentResult = await assignmentService.deleteAssignment(req.userId, req.params.assignmentID);
            if (assignmentResult.success) {
              res.status(200).json({ message: constants.successMags.assDeleted, deletedAssignment: assignmentResult.deletedAssignment });
            } else if (assignmentResult.notAllowed) {
              res.status(400).json({ message: constants.warningMsgs.notAllowed });
            } else if (assignmentResult.assignmentNotFound) {
              res.status(404).json({ message: constants.errorMsgs.assError });
            } else {
              res.status(500).json({ message: constants.errorMsgs.error });
            }
          } catch (error) {
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // GET ALL COURSE ASSIGNMENT
    static getAllAssignment = async(req:any, res:any) =>{
        try {
            const assignmentResult = await assignmentService.getAllAssignments(req.userId, req.params.id);
        
            if (assignmentResult.success) {
              res.status(200).json({ assignments: assignmentResult.assignments });
            } else if (assignmentResult.notAllowed) {
              res.status(400).json({ message: constants.warningMsgs.notAllowed });
            } else {
              res.status(400).json({ message: constants.errorMsgs.assError });
            }
          } catch (error) {
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // GET COURSE ASSIGNMENT
    static getAssignment = async(req:any, res:any) =>{
        try {
            const assignmentResult = await assignmentService.getAssignmentById(req.userId, req.params.id);
            if (assignmentResult.success) {
              res.status(200).json({ assignment: assignmentResult.assignment });
            } else if (assignmentResult.notAllowed) {
              res.status(400).json({ message: constants.warningMsgs.notAllowed });
            } else {
              res.status(400).json({ message: constants.errorMsgs.assError });
            }
          } catch (error) {
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // GET COURSE ASSIGNMENT BY STUDENT
    static getAssignmentByStud = async(req:any, res:any) =>{
        try {
            const assignmentResult = await assignmentService.getAssignmentByStudent(req.userId, req.params.id);
            if (assignmentResult.success) {
              res.status(200).json(assignmentResult.assignment);
            } else if (assignmentResult.notEnrolled) {
              res.status(400).json({ message: constants.warningMsgs.notEnrolled });
            } else {
              res.status(400).json({ message: constants.errorMsgs.assError });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }    

    // SUBMIT COURSE ASSIGNMENT BY STUDENT
    static submitAssignment = async(req:any, res:any) =>{
        try {
            const submissionResult = await assignmentService.submitAssignment(req.userId, req.body);
            if (submissionResult.success) {
              res.status(200).json(submissionResult.submission);
            } else if (submissionResult.notEnrolled) {
              res.status(400).json({ message: constants.warningMsgs.notEnrolled });
            } else {
              res.status(400).json({ message: constants.errorMsgs.assError });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

}