const todoModel = require("../models/todoModel");

// module.exports.getTodo = async (req, res) => {
//   const todo = await todoModel.find();
//   res.send(todo);
// };
module.exports.getTodo = async (req, res) => {
  try {
    const todo = await todoModel.find();
    res.send(todo);
  } catch (err) {
    console.log(err);
  }
};

// module.exports.saveTodo = async (req, res) => {
//   const { text } = req.body;
//   todoModel.create({ text }).then((data) => {
//     console.log("Added Successfully...");
//     res.status(201);
//     res.send(data);
//   });
// };
module.exports.saveTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await todoModel.create({ text });

    console.log("Added Successfully...");
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
  }
};

// module.exports.updateTodo = async (req, res) => {
//   const { _id, text } = req.body;
//   todoModel
//     .findByIdAndUpdate(_id, { text })
//     .then(() => res.send("Updated Successfully..."))
//     .catch((err) => console.log(err));
// };
module.exports.updateTodo = async (req, res) => {
  try {
    const { _id, text } = req.body;
    await todoModel.findByIdAndUpdate(_id, { text });
    res.status(200).send("Updated Successfully...");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// module.exports.deleteTodo = async (req, res) => {
//   const { _id } = req.body;
//   todoModel
//     .findByIdAndDelete(_id)
//     .then(() => res.send("Deleted Successfully..."))
//     .catch((err) => console.log(err));
// };
module.exports.deleteTodo = async (req, res) => {
  try {
    const { _id } = req.body;
    await todoModel.findByIdAndDelete(_id);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
