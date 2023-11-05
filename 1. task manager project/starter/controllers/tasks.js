const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

//get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  //using find function of the mongoose model
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

//create task
const createTask = asyncWrapper(async (req, res) => {
  //using create  function of the mongoose model
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//get single task
const getTask = asyncWrapper(async (req, res, next) => {
  //using findOne function of the mongoose model
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

//delete task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

//update task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //return the new item that is already updated
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
