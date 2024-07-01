import { NextFunction, Request, Response } from "express";
import { Session } from "../models/session.model";

// Configuração do tempo de expiração em milissegundos
const SESSION_EXPIRATION_TIME = process.env.SESSION_EXPIRATION_TIME || 120000;

// função de resposta de erro. 'unauthorizedResponse' => reduz a duplicação de códigos.
const unauthorizedResponse = (res: Response, message: string) => {
  return res.status(401).json({
    message:"Você não está autorizado a fazer isso"
  });
};
// Middleware de autenticação
export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.headers.token;

  if (!userToken) {
    return unauthorizedResponse(res, "Você não está autorizado a fazer isso");
  }

// Busca a sessão do usuário
  const userSession = await Session.findOne({
    where: { token: userToken, active: true },
  });

  if (!userSession) {
    return unauthorizedResponse(res, "Você não está autorizado a fazer isso");
  }

// Verifica se a sessão expirou

  const expiredSession = userSession.createdAt;
  const dateSessionMs = expiredSession.getTime();
  const dateNow = new Date();
  const dateNowMs = dateNow.getTime();

  const diferencDate = dateNowMs - dateSessionMs

  if (diferencDate > parseInt('SESSION_EXPIRATION_TIME')) {
    await userSession.update({ active: false });
    return unauthorizedResponse(res, "Você não está autorizado a fazer isso");
  }

  next();
};
