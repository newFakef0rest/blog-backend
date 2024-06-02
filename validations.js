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
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Имя должно содержать минимум 3 символа").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неправильный URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Заголовок должен содержать минимум 3 символа")
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "Контент должен содержать минимум 10 символов")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Теги должны содержать минимум 1 символ")
    .optional()
    .isArray({ min: 1 }),
  body("imageUrl", "Incorrect URL").optional().isString(),
];

export const postUpdateValidation = [
  body("title", "Заголовок должен содержать минимум 3 символа")
    .optional()
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "Контент должен содержать минимум 10 символов")
    .optional()
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Теги должны содержать минимум 1 символ")
    .optional()
    .isArray({ min: 1 }),
  body("imageUrl", "Неправильный URL").optional().isString(),
];
