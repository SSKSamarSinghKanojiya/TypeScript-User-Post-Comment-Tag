import { Request, Response } from "express";
import Tag from "../models/tags";

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const tag = await Tag.query().insert({ name });
    res.status(201).json({ message: "Tag created successfully", data: tag });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const tagList = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.query();
    res.status(200).json({ message: "Tags fetched successfully", data: tags });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.query().findById(id);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json({ message: "Tag fetched successfully", data: tag });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.query().patchAndFetchById(id, req.body);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json({ message: "Tag updated successfully", data: tag });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.query().findById(id);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    }
    await Tag.query().deleteById(id);
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};







// import { Request, Response } from "express";
// import Tag from "../models/tags";

// export const createTag: any = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     const tags = await Tag.query().insert({ name });
//     res.status(200).json({ message: "Tag create Successfully", tags });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


// export const tagList:any = async(req:Request,res:Response)=>{
//   try {
//     const tags = await Tag.query();
//     if (!tags) {
//       return res.status(401).json({message:"Tags not found"})
//     }
//     return res.status(201).json({message:"Tags Fetch",tags})

//   } catch (err: Error | any) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// }


// export const getTagById: any = async (req: Request, res: Response) => {
//   try {
//     const tagId = req.params.id;
//     if (!tagId) {
//       return res.status(400).json({ message: "Tag ID is required" });
//     }
    
//     const tag = await Tag.query().findById(tagId);

//     if (!tag) {
//       return res.status(404).json({ message: "Tag not found" });
//     }

//     res.status(200).json({ message: "Get Data Successful", tag });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };




// export const updateTag:any = async(req:Request,res:Response)=>{
//   try {
//     const tagId = req.params.id
//     if (!tagId) {
//       return res.status(400).json({message:"Tag ID is required"})
//     }
//     const tag = await Tag.query().patchAndFetchById(tagId,req.body)
  
//     if (!tag) {
//       return res.status(404).json({message:"Tag not found"})
//     }
//     res.status(200).json({message:"Update Tag Data Successfully",tag})
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }


// export const deleteTag:any = async(req:Request,res:Response)=>{
//   try {
//     const tagId = req.params.id;
//     const tag = await Tag.query().findById(tagId)
//     if (!tag) {
//       return res.status(404).json({message:"Tag not found"})
//     }
//     await Tag.query().deleteById(tagId)
//     res.status(200).json({ message: 'Tag deleted successfully' });
//   } catch (err:any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }