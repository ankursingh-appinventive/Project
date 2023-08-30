import express from 'express'
import { session } from '../middleware/auth';
import { forumPostCont } from '../controllers/fourmPostCont';
import { validate } from "../middleware/validate";
const forumRouter = express.Router();

forumRouter.post("/createForumPost", validate.validateCreateForumPost, session.sessionCheck, forumPostCont.createForumPost);
forumRouter.get("/getUserForumPostsByCourse/:id", session.sessionCheck, forumPostCont.getUserForumPostsByCourse);
forumRouter.get("/getUserForumPostById/:id", session.sessionCheck, forumPostCont.getUserForumPostById);
forumRouter.patch('/updateForumPost', validate.validateUpdateForumPost, session.sessionCheck, forumPostCont.updateForumPost);
forumRouter.delete("/deleteForumPost/:id", session.sessionCheck, forumPostCont.deleteForumPost);
forumRouter.put('/ForumPostWithReplies', validate.validateReplies, session.sessionCheck, forumPostCont.updateForumPostWithReplies);

export default forumRouter;