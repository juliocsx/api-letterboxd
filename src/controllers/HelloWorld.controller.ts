import { NextFunction, Request, Response } from "express";

export const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "Hello World!" })
};
