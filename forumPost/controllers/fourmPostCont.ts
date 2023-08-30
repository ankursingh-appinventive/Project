import { forumPostService } from "../services/forumPostSer";
import { constants } from "../constants";

export class forumPostCont{

    // CREATE FORUMPOST
    static createForumPost = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const postdata = req.body;
            const creationResult = await forumPostService.createForumPost(uid, postdata);        
            if (creationResult.success) {
              res.status(201).json(creationResult.forumPost);
            } else {
              res.status(400).json({ message: constants.warningMsgs.notEnrolled });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // GET ALL COURSE FORUMPOST
    static getUserForumPostsByCourse = async (req: any, res: any) => {
        try {
            const uid = req.userId;
            const courseId = req.params.id;
            const userForumPosts = await forumPostService.getUserForumPostsByCourse(uid, courseId);
            res.status(200).json(userForumPosts);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    };

    // GET COURSE FORUMPOST BY ID
    static getUserForumPostById = async (req: any, res: any) => {
        try {
            const uid = req.userId;
            const forumPostId = req.params.id;
            const userForumPost = await forumPostService.getUserForumPostById(uid, forumPostId);
            if (!userForumPost) {
              return res.status(404).json({ message: constants.errorMsgs.postEror });
            }
            res.status(200).json(userForumPost);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    };
        
    // UPDATE FORUMPOST
    static updateForumPost = async (req: any, res: any) => {
        try {
            const uid = req.userId;
            const { postId, updatedText } = req.body;
            const updatedPost = await forumPostService.updateForumPost(uid, postId, updatedText);
            if (!updatedPost) {
              return res.status(404).json({ message: constants.errorMsgs.postEror });
            }
            res.status(200).json(updatedPost);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }

    // DELETE FORUMPOST
    static deleteForumPost = async (req: any, res: any) => {
        try {
            const uid = req.userId;
            const postId = req.params.id;
            const deletedPost = await forumPostService.deleteForumPost(uid, postId);
            if (!deletedPost) {
              return res.status(404).json({ message: constants.errorMsgs.postEror });
            }
            res.status(200).json({ message: constants.successMags.success  });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }    

    // UPDATE FORUMPOST WITH REPLIES
    static updateForumPostWithReplies = async(req:any, res:any) =>{
        try {
            const uid = req.userId;
            const { postId, text } = req.body;
            const updatedForumPost = await forumPostService.updateForumPostWithReplies(uid, postId, text);
            
            if (!updatedForumPost) {
              return res.status(404).json({ error: constants.errorMsgs.postEror });
            }
        
            res.status(200).json(updatedForumPost);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: constants.errorMsgs.error });
          }
    }
    
}