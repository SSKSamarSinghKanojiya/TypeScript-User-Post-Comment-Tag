import { Request, Response } from "express";
import Post from "../models/posts";

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure user_id, title, content from request body
    const { user_id, title, content } = req.body;

    // Insert a new post record into the database
    const posts = await Post.query().insert({ user_id, title, content });

    // Send success response with created post
    res.status(201).json({ message: "Post created successfully", posts });
  } catch (err: any) {
    // Catch and respond to any server errors
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get list of all posts
export const postList = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all posts from database
    const posts = await Post.query();

    // If no posts found, send 404 (not 401 - unauthorized)
    if (!posts || posts.length === 0) {
      res.status(404).json({ message: "No posts found" });
      return;
    }

    // Send the list of posts with 200 OK
    res.status(200).json({ message: "Posts fetched successfully", posts });
    return ;
  } catch (err: any) {
    // Handle server error
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get single post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;

    // Validate postId presence
    if (!postId) {
      res.status(400).json({ message: "Post ID is required" });
      return
    }

    // Query post by ID
    const post = await Post.query().findById(postId);

    // If post not found, send 404
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return
    }

    // Send found post
    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update post by ID
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;

    if (!postId) {
      res.status(400).json({ message: "Post ID is required" });
      return
    }

    // Patch and fetch updated post
    const post = await Post.query().patchAndFetchById(postId, req.body);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return
    }

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete post by ID
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;

    // Find post by ID first
    const post = await Post.query().findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return
    }

    // Delete post from database
    await Post.query().deleteById(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};






// import { Request,Response } from "express"
// import Post from "../models/posts"

// export const createPost = async(req:Request,res:Response):Promise<void>=>{
//   try {
//     const {user_id, title,content} = req.body
//     const posts = await Post.query().insert({user_id,title,content})
//     res.status(201).json({message:"Post create successfully ",posts})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// }


// export const postList:any = async (req: Request, res: Response) => {
//   try {
//     const posts = await Post.query();
//     if (!posts) {
//       return res.status(401).json({message:"post not found"})
//     }
//     return res.status(201).json({message:"Post Fetch",posts})

//   } catch (err: Error | any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };



// export const getPostById: any = async (req: Request, res: Response) => {
//   try {
//     const postId = req.params.id;
//     if (!postId) {
//       return res.status(400).json({ message: "Post ID is required" });
//     }
    
//     const post = await Post.query().findById(postId);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.status(200).json({ message: "Get Data Successful", post });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// export const updatePost:any = async(req:Request,res:Response)=>{
//   try {
//     const postId = req.params.id
//     if (!postId) {
//       return res.status(400).json({message:"Post ID is required"})
//     }
//     const post = await Post.query().patchAndFetchById(postId,req.body)
  
//     if (!post) {
//       return res.status(404).json({message:"Post not found"})
//     }
//     res.status(200).json({message:"Update Post Data Successfully",post})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

// export const deletePost:any = async(req:Request,res:Response)=>{
//   try {
//     const postId = req.params.id;
//     const post = await Post.query().findById(postId)
//     if (!post) {
//       return res.status(404).json({message:"Post not found"})
//     }
//     await Post.query().deleteById(postId)
//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }