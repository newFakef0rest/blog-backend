import { validationResult } from "express-validator";

export default (req, res, next) => {
  // Проверка на ошибки в валдиации
  const errors = validationResult(req);

  // Валидация
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};
