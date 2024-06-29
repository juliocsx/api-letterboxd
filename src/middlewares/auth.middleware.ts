import { NextFunction, Request, Response } from "express";
import { Session } from "../models/session.model";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.headers.token;

  if(!userToken){
    return res.status(401).json({
        message: "Você não está autorizado a fazer isso "
    })
  }

  const userSession = await Session.findOne({
    where: { token: userToken, active: true },
  });

  if(!userSession){
      return res.status(401).json({
          message: "Você não está autorizado a fazer isso"
        })
    }
    
    // implementation here
    const expiredSession = userSession.createdAt
    const dateSessionMs = expiredSession.getTime()
    
    const dateNow = new Date()
    const dateNowMs = dateNow.getTime()
     
     
    const diferencDate: number = dateNowMs - dateSessionMs

    if(diferencDate > 120000){
        userSession.update({active: false})
        userSession.save()
        return res.status(401).json({
            message: "Você não está autorizado a fazer isso"
          })
    }
    
    
  next();
    
};
