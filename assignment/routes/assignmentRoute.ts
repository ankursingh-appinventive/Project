import express from 'express'
import { session } from '../middleware/auth';
import { assignmentCont } from '../controllers/assignmentCont';
import { validate } from '../middleware/validate';
const assignmentRouter = express.Router();

assignmentRouter.post("/createAssignment", validate.validateCreateAssignment, session.instructorSessionCheck, assignmentCont.createCourseAssignment);
assignmentRouter.put("/updateAssignment/:id", session.instructorSessionCheck, assignmentCont.updateAssignment);
assignmentRouter.delete("/deleteAssignment/:id", session.instructorSessionCheck, assignmentCont.deleteAssignment);
assignmentRouter.get('/getAllAssignment/:id', session.instructorSessionCheck, assignmentCont.getAllAssignment);
assignmentRouter.get("/getAssignment/:id", session.instructorSessionCheck, assignmentCont.getAssignment);
assignmentRouter.get('/getAssignmentByStud/:id', session.sessionCheck, assignmentCont.getAssignmentByStud);
assignmentRouter.post("/submitAssignment", validate.validateSubmitAssignment, session.sessionCheck, assignmentCont.submitAssignment);

export default assignmentRouter;