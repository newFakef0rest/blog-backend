import mongoose from "mongoose";

// Создание схемы

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  //   Автоматическая генерация временных меток
  {
    timestamps: true,
  }
);

// Создание названия для модели и схемы
export default mongoose.model("Post", PostSchema);
