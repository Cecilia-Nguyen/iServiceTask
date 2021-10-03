const Task = require('../model/Task');
module.exports.getTask = function (req, res) {
	res.send('Get Task');
};
module.exports.postTask = function (req, res) {
  const task = new Task({
		Type: req.body.Type,
        Title: req.body.Title,
        Description: req.body.Description,
        Suburb: req.body.Suburb,
        Date: req.body.Date,
        BudgetType: req.body.BudgetType,
        BudgetAmount: req.body.BudgetAmount
  })
  task.save().then((res) => {
	  console.log(task)
  })
  .catch((err) => console.log(err));
};

