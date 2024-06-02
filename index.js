import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

const unlinkAsync = promisify(fs.unlink);

// Расширение обязательно выписывать

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  postUpdateValidation,
} from "./validations.js";

// Импортирование функции для обработки ошибок валидации

import handleValidationError from "./utils/validationError.js";

// Импорт функции для проверки авторизации

import CheckAuth from "./utils/checkAuth.js";

// Импорт контроллеров

import { UserController, PostController } from "./controllers/index.js";
// Подключение к Базе Данных (нужно вписывать пароль и имя БД)

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

const app = express();

// Подключение multer (библиотека для загрузки файлов)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Подключение JSON к серверу

app.use(express.json());

// Подключение CORS

app.use(cors());

// Подключение статики

app.use("/uploads", express.static("uploads"));

// Авторизация

app.post(
  "/auth/login",
  loginValidation,
  handleValidationError,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserController.register
);

app.get("/auth/me", CheckAuth, UserController.getMe);

// Загрузка файлов

app.post("/upload", CheckAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.delete("/upload", CheckAuth, upload.single("image"), async (req, res) => {
  try {
    await unlinkAsync(`.${req.body.url}`);
    res.json({ message: "File deleted" });
  } catch (err) {
    console.error(err);
  }
});

// Посты

app.get("/posts", PostController.getAll);

// Получение тегов

app.get("/posts/tags", PostController.getLastTags);

app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  CheckAuth,
  postCreateValidation,
  handleValidationError,
  PostController.create
);

app.delete("/posts/:id", CheckAuth, PostController.deleteOne);

app.patch(
  "/posts/:id",
  CheckAuth,
  postUpdateValidation,
  handleValidationError,
  PostController.updateOne
);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`server is running on port ${process.env.PORT}`);
});
