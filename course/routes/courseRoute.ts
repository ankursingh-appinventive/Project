import express from 'express'
import { session } from '../middleware/auth';
import { courseCont } from '../controllers/courseCont';
import { validate } from '../middleware/validate';
const courseRouter = express.Router();

courseRouter.post("/createCoures", validate.validateCreateCourse, session.instructorSessionCheck, courseCont.createCourse);
courseRouter.put("/updateCourse", session.instructorSessionCheck, courseCont.updateCousrse);
courseRouter.delete("/deleteCourse", session.instructorSessionCheck, courseCont.deleteCourse);
courseRouter.get('/getAllCourses', session.sessionCheck, courseCont.getAllCourse);
courseRouter.get("/getCourse", session.sessionCheck, courseCont.getCourseByTittle);
courseRouter.get('/getUserCourses', session.sessionCheck, courseCont.getCourseOfUser);
courseRouter.post("/enrollCourse", session.sessionCheck, courseCont.enrollCourse);
courseRouter.post('/coursePayment', courseCont.coursePayment);
courseRouter.get("/getProgress/:id", session.sessionCheck, courseCont.getProgress);

export default courseRouter;