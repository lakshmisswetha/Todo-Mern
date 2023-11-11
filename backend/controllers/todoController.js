const todoModel = require("../models/todoModel");

module.exports.getTodo = async (req, res) => {
    try {
        const data = await todoModel.find({}, { __v: 0 });
        return res.status(200).json({
            status: true,
            todo: data,
            message: "Successfully fetched",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};

module.exports.saveTodo = async (req, res) => {
    try {
        const { text } = req.body;
        const data = await todoModel.create({ text });
        return res.status(201).json({ status: true, todo: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};

module.exports.updateTodo = async (req, res) => {
    try {
        const { _id, text } = req.body;

        const result = await todoModel.findByIdAndUpdate(
            _id,
            { text },
            { new: true }
        );
        if (result) return res.status(200).json({ status: true });
        else return res.status(200).json({ status: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};

module.exports.deleteTodo = async (req, res) => {
    try {
        const { _id } = req.body;
        await todoModel.findByIdAndDelete(_id);
        return res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};
