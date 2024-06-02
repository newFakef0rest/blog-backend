import mongoose from "mongoose";

// Создание схемы

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //  Хэш пароля
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  //   Автоматическая генерация временных меток
  {
    timestamps: true,
  }
);

// Создание названия для модели и схемы
export default mongoose.model("User", UserSchema);
