import { NextFunction, Request, Response } from "express";
import { unauthorizedResponse } from "../middlewares/auth.middleware";
import { Movie } from "../models/Movie.models";

export const getMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const movieData = await Movie.findAll()


        return res.status(200).json({message: "users listed sucessfully", data: movieData})
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "error at list users", error: error });
    }
}


export const createMovie = async(
req: Request,
res: Response,
next: NextFunction

) =>{
try {
    return unauthorizedResponse(res, 'você não está autorizado a fazer isso')
} catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at list users", error: error });
}
}



