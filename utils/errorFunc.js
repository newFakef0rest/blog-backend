export const errorFunc = (err, res) => {
  console.log(err);
  res.status(500).json({ message: "something went wrong", error: err });
};
