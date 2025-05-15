
import { Request,Response } from "express"
import PostTag from "../models/post_tag"

/*
post_id!: number;
  tag_id!: number;
*/

// export const createPostTag:any = async(req:Request,res:Response):Promise<void>=>{
//   try {
//     const {post_id, tag_id} = req.body
//     const postTag = await PostTag.query().insert({post_id, tag_id})
//     res.status(201).json({message:"PostTag create successfully ",postTag})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// }

// export const createPostTag = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { post_id, tag_id } = req.body;
//     const postTag = await PostTag.query().insert({ post_id, tag_id });
//     res.status(201).json({ message: "PostTag created successfully", postTag });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


export const createPostTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id, tag_id } = req.body;

    // Check if the post_tag already exists
    const existing = await PostTag.query()
      .findOne({ post_id, tag_id });

    if (existing) {
      res.status(409).json({ message: "PostTag already exists", postTag: existing });
      return;
    }

    // Insert only if it doesn't exist
    const postTag = await PostTag.query().insert({ post_id, tag_id });
    res.status(201).json({ message: "PostTag created successfully", postTag });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// export const postTagList:any = async (req: Request, res: Response) => {
//   try {
//     const postTag = await PostTag.query();
//     if (!postTag) {
//       return res.status(401).json({message:"postTag not found"})
//     }
//     return res.status(201).json({message:"Post Fetch",postTag})

//   } catch (err: Error | any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

export const postTagList = async (req: Request, res: Response) => {
  try {
    const postTags = await PostTag.query();
    res.status(200).json({ message: "PostTags fetched", postTags });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// export const getPostTagById: any = async (req: Request, res: Response) => {
//   try {
//     const postTagId = req.params.id;
//     if (!postTagId) {
//       return res.status(400).json({ message: "PostTag ID is required" });
//     }
    
//     const postTag = await PostTag.query().findById(postTagId);

//     if (!postTag) {
//       return res.status(404).json({ message: "postTag not found" });
//     }

//     res.status(200).json({ message: "Get Data Successful", postTag });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getPostTagById:any = async (req: Request, res: Response) => {
  try {
    const { post_id, tag_id } = req.params;
    if (!post_id || !tag_id) {
      return res.status(400).json({ message: "Both post_id and tag_id are required" });
    }

    const postTag = await PostTag.query().findById([post_id, tag_id]);

    if (!postTag) {
      return res.status(404).json({ message: "PostTag not found" });
    }

    res.status(200).json({ message: "PostTag found", postTag });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// export const updatePostTag:any = async(req:Request,res:Response)=>{
//   try {
//     const postTagId = req.params.id
//     if (!postTagId) {
//       return res.status(400).json({message:"postTagId ID is required"})
//     }
//     const postTag = await PostTag.query().patchAndFetchById(postTagId,req.body)
  
//     if (!postTag) {
//       return res.status(404).json({message:"PostTag not found"})
//     }
//     res.status(200).json({message:"Update Post Data Successfully",postTag})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

export const updatePostTag:any = async (req: Request, res: Response) => {
  try {
    const { post_id, tag_id } = req.params;
    if (!post_id || !tag_id) {
      return res.status(400).json({ message: "Both post_id and tag_id are required" });
    }

    const postTag = await PostTag.query().patchAndFetchById([post_id, tag_id], req.body);

    if (!postTag) {
      return res.status(404).json({ message: "PostTag not found" });
    }

    res.status(200).json({ message: "PostTag updated", postTag });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// export const deletePostTag:any = async(req:Request,res:Response)=>{
//   try {
//     const postTagId = req.params.id;
//     const post = await PostTag.query().findById(postTagId)
//     if (!post) {
//       return res.status(404).json({message:"Post not found"})
//     }
//     await PostTag.query().deleteById(postTagId)
//     res.status(200).json({ message: 'PostTag deleted successfully' });
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

export const deletePostTag:any = async (req: Request, res: Response) => {
  try {
    const { post_id, tag_id } = req.params;
    if (!post_id || !tag_id) {
      return res.status(400).json({ message: "Both post_id and tag_id are required" });
    }

    const postTag = await PostTag.query().findById([post_id, tag_id]);
    if (!postTag) {
      return res.status(404).json({ message: "PostTag not found" });
    }

    await PostTag.query().deleteById([post_id, tag_id]);

    res.status(200).json({ message: "PostTag deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
