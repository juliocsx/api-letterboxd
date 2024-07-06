import { NextFunction, Request, Response } from "express";
import { Streaming  } from "../models/streaming.model";

export const getStreamings = async (req: Request, res: Response, next: NextFunction) => {
try {
    const streamingsData = await Streaming.findAll();
    
    if (!streamingsData.length) {
        return res.status(404).json({
            message: "streamings not found",
            data: streamingsData,
        });
    }
    return res 
    .status(200)
    .json({ message: "streamings listed sucessfully", data: streamingsData });
} catch (error) {
    console.log(error);
    return res
    .status(500)
    .json({ message: "errorat list streamings", error: error})
}};



export const createStreamings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, company, url } = req.body;

        if (!name || !company || !url) {
            return res
              .status(400)
              .json({ message: "Required field not filled" });
        }

        const streamingCreated = await Streaming.create({
            name: name,
            company: company,
            url: url,
        });

        return res 
        .status(201)
        .json({ message: "streaming created with success", data: streamingCreated });   
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "error at create streaming", error: error });
        
    }
 }



export const updateStreamings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name , company, url } = req.body;
        const id = req.params.id;
    
        let updateStreaming: any = {};
    
        if (name) {
          updateStreaming.name = name;
        }
        if (company) {
          updateStreaming.company = company;
        }
        if (url) {
          updateStreaming.url = url;
        }
        
        const updatedStreaming = await Streaming.update(
          { ...updateStreaming },
          { where: { streaming_id: id } }
        );
    
        return res
          .status(200)
          .json({ message: "streaming updated sucessfully", data: updatedStreaming });
      } catch (error) {
        console.log(error); 
      }
    };
