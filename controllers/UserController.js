import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Импорт функции для обработки ошибок

import { errorFunc } from "../utils/errorFunc.js";

// Импорт модели

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    // Генерация шифрования пароля
    const salt = bcrypt.genSaltSync(10);
    // Шифрования пароля (пароль, коды шифрования)
    const hash = bcrypt.hashSync(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    errorFunc(err, res);
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    // Проверка на наличие пользователя
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Проверка на правильность пароля
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({ message: "Invalid login or password" });
    }
    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    errorFunc(err, res);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    errorFunc(error, res);
  }
};
