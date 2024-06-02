import PostModel from "../models/Post.js";

// Импорт функции для обработки ошибок

import { errorFunc } from "../utils/errorFunc.js";

export const getAll = async (req, res) => {
  try {
    // Получение всех постов, а так-же связывание и получение данных о пользователе

    const posts = await PostModel.find().populate("user").exec();

    // Проверка на наличие постов
    if (posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.json(posts);
  } catch (err) {
    errorFunc(err, res);
  }
};

export const getOne = async (req, res) => {
  try {
    // Получение передаваемого ID

    const postId = req.params.id;

    // Поиск поста по ID и увеличение количества просмотров

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      //   Возвращение обновленного поста
      {
        returnDocument: "after",
      }
    ).populate("user");

    // Проверка на наличие поста

    if (!post || post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    errorFunc(err, res);
  }
};

export const create = async (req, res) => {
  try {
    // Создание нового поста

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    // Сохранения поста

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    errorFunc(err, res);
  }
};

export const deleteOne = async (req, res) => {
  try {
    // Получение передаваемого ID

    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    const { _id } = deletedPost;

    res.json(_id);
  } catch (err) {
    errorFunc(err, res);
  }
};

export const updateOne = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    errorFunc(err, res);
  }
};

export const getLastTags = async (req, res) => {
  try {
    // Получение тегов последних 5 постов

    const posts = await PostModel.find().limit(5);

    // Проверка на наличие постов
    if (posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    errorFunc(err, res);
  }
};
