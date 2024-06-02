import express from "express";
import multer from "multer";
import cors from "cors";

import mongoose from "mongoose";

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

mongoose
  .connect(
    "mongodb+srv://admin:sobakasobaka@fakef0rest.sj9a0t5.mongodb.net/blog"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

const app = express();

// Подключение multer (библиотека для загрузки файлов)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("server is running on port 5000");
});
