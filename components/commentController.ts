import { Request, Response } from "express";
import Comment from "../models/comments";

// ✅ Create a new comment
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id, author, content } = req.body;

    // Check if required fields are present
    if (!post_id || !author || !content) {
      res.status(400).json({ message: "All fields are required: post_id, author, content" });
      return;
    }

    const comment = await Comment.query().insert({ post_id, author, content });

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Fetch all comments
export const commentList = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.query();

    // Even if empty, return an empty array with 200
    res.status(200).json({ message: "Comments fetched successfully", comments });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Fetch a comment by ID
export const getCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = req.params.id;

    if (!commentId) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    const comment = await Comment.query().findById(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json({ message: "Comment fetched successfully", comment });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Update a comment by ID
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = req.params.id;

    if (!commentId) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    const updatedComment = await Comment.query().patchAndFetchById(commentId, req.body);

    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Delete a comment by ID
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = req.params.id;

    if (!commentId) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    const comment = await Comment.query().findById(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    await Comment.query().deleteById(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};















// import { Request,Response } from "express";
// import Comment from "../models/comments";

// export const createComment = async(req:Request,res:Response)=>{
//   try {
//     const {post_id,author,content} = req.body
//     const comments = await Comment.query().insert({post_id,author,content})
//     res.status(201).json({message:"Comment Create Successfully",comments})
//   } catch (err:any) {
//     res.status(500).json({message:"Server Error",error:err.message})
//   }
// }


// export const commentList:any = async(req:Request,res:Response)=>{
//   try {
//     const comments = await Comment.query()
//     if (!comments) {
//       return res.status(401).json({message:"comments not found"})
//     }
//     return res.status(201).json({message:"Comment Fetch",comments})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// }


// export const getCommentById:any = async(req:Request,res:Response)=>{
//   try {
//     const commentId = req.params.id
//   if (!commentId) {
//     return res.status(400).json({message:"Comment ID is required"})
//   }
//   const comment = await Comment.query().findById(commentId)
//   if (!comment) {
//     return res.status(404).json({message:"Comment not found"})
//   }
//   res.status(200).json({message:"Get Comment Data",comment})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }


// export const updateComment:any = async(req:Request,res:Response)=>{
//   try {
//     const commentId = req.params.id
//     if (!commentId) {
//       return res.status(400).json({message:"Comment ID is required"})
//     }
//     const comment = await Comment.query().patchAndFetchById(commentId,req.body)

//     if (!comment) {
//       return res.status(404).json({message:"Comment not found"})
//     }
//     res.status(200).json({message:"Update Comment Data",comment})
//   } catch (err:any) {
//     res.status(500).json({message:"Server Error", error:err.message})
//   }
// }

// export const deleteComment:any = async(req:Request,res:Response)=>{
//   try {
//     const commentId = req.params.id
//     const comment = await Comment.query().findById(commentId)
//     if (!comment) {
//       return res.status(404).json({message:"Comment not found"})
//     }
//     await Comment.query().deleteById(commentId)

//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
    
//   }
// }
// /*
//  post_id!:number;
//   author!:string;
//   content!:string;

// */