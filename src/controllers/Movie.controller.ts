import { NextFunction, Request, Response } from "express";
import { Movie } from "../models/Movie.models";

export const getMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const movieData = await Movie.findAll()
        
        if (!movieData.length) {
            return res.status(404).json({
              message: "Movies not found",
              data: movieData,
            });
          }

        return res.status(200).json({message: "Movie listed sucessfully", data: movieData})
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "error at list Movie", error: error });
    }
}


export const createMovie = async(
req: Request,
res: Response,
next: NextFunction

) =>{
try {
  const {name, director, release_date, sinopse, duration} = req.body
  
  if (!name||!director || !release_date || !sinopse || !duration) {
    return res
    .status(400)
    .json({message: "melhora no pedido ae, pae"})
  }
  

const movieCreated = await Movie.create({
    name: name,
    director: director,
    release_date: release_date,
    sinopse: sinopse,
    duration: duration
  });

} catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at created Movie", error: error });
}
}

export const updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, director, release_date, sinopse, duration} = req.body
        const id = req.params.id
        let updatedContent:any = {}

        if (name) {
            updatedContent.name = name
        }
        if (director) {
            updatedContent.director = director
        }
        if (release_date) {
            updatedContent.release_date = release_date
        }
        if (sinopse) {
            updatedContent.sinopse = sinopse
        }
        if (duration) {
            updatedContent.duration = duration
        }
        
        const updatedMovie = await Movie.update(
            {...updatedContent},
            {where:{movie_id:id}}
        )

        return res.status(201).json({message: "Movie updated sucessfully", updatedMovie})
        
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "error at updating Movie", error: error });
    }

}



