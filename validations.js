import { body } from "express-validator";

// Создание валидатора для авторизации

export const loginValidation = [
  body("email", "Incorrect Email").isEmail(),
  body("password", "The password has to contain minimum 5 symbols").isLength({
    min: 5,
  }),
];

// Создание валидатора для регистрации

export const registerValidation = [
  body("email", "Incorrect Email").isEmail(),
  body("password", "The password has to contain minimum 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "The name has to contain minimum e symbols").isLength({
    min: 3,
  }),
  body("avatarUrl", "Incorrect URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "The title has to contain minimum 3 symbols")
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "The content has to contain minimum 10 symbols")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "The tags has to contain minimum 1 symbol")
    .optional()
    .isArray({ min: 1 }),
  body("imageUrl", "Incorrect URL").optional().isString(),
];

export const postUpdateValidation = [
  body("title", "The title has to contain minimum 3 symbols")
    .optional()
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "The content has to contain minimum 10 symbols")
    .optional()
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "The tags has to contain minimum 1 symbol")
    .optional()
    .isArray({ min: 1 }),
  body("imageUrl", "Incorrect URL").optional().isString(),
];
