import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import argon from "argon2";
import crypto from "crypto";
import { Session } from "../models/session.model";
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersData = await User.findAll();

    if (!usersData.length) {
      return res.status(404).json({
        message: "users not found",
        data: usersData,
      });
    }

    return res
      .status(200)
      .json({ message: "users listed sucessfully", data: usersData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at list users", error: error });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password, phone, cpf, birthdate } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "cannot create a user without name" });
    }

    if (!username) {
      return res
        .status(400)
        .json({ message: "cannot create a user without username" });
    }

    const hashedPassword = await argon.hash(password);

    const userCreated = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
      cpf: cpf,
      birthdate: birthdate,
    });

    return res
      .status(201)
      .json({ message: "user created with success", data: userCreated });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at create user", error: error });
  }
};

export const updateEmailUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, cpf } = req.body;
    const id = req.params.id;

    let updatedContent: any = {};

    if (email) {
      updatedContent.email = email;
    }

    if (cpf) {
      updatedContent.cpf = cpf;
    }

    const updatedUser = await User.update(
      { ...updatedContent },
      { where: { user_id: id } }
    );

    return res
      .status(200)
      .json({ message: "user updated sucessfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at updating user", error: error });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.destroy({ where: { user_id: id } });
    return res.status(200).json({ message: "user deleted sucessfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at deleting user", error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    const usernameExists = await User.findOne({
      where: { username: username },
    });

    if (!usernameExists) {
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    const validPassword = await argon.verify(usernameExists.password, password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    const token = crypto.randomBytes(25).toString("hex");

    const lastSession = await Session.findOne({
      where: { user_id: usernameExists.user_id, active: true },
    });

    if(lastSession){
      await lastSession.update({
        active: false
      })

      lastSession.save()
    }

    const userSession = await Session.create({
      token: token,
      user_id: usernameExists.user_id,
    });

    return res.status(200).json({
      message: "👍Usuario logado com sucesso 🚀",
      token: token,
      user: {
        id: usernameExists.user_id,
        username: usernameExists.username,
        email: usernameExists.email,
        name: usernameExists.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error at login user", error: error });
  }
};
 