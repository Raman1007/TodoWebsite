//const db = require('./config/mongoose')
const TodoLists = require("../models/todo_list");
module.exports.home = function (req, res) {
	TodoLists.find({}, function (err, todo) {
		if (err) {
			console.log("Error in fetching data");
			return;
		}

		return res.render("homePage", {
			title: "Home",
			todoList: todo,
		});
	});
};
// function for new Data
function DateValeu(dueDate) {
	let months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUNE",
		"JULY",
		"AUG",
		"SEPT",
		"OCT",
		"NOV",
		"DEC",
	]; // Static value for implementing months value

	newdate = "";
	let monapp = "";
	// Checking months
	if (dueDate[1] == "01") {
		monapp = months[0];
	} else if (dueDate[1] == "02") {
		monapp = months[1];
	} else if (dueDate[1] == "03") {
		monapp = months[2];
	} else if (dueDate[1] == "04") {
		monapp = months[3];
	} else if (dueDate[1] == "04") {
		monapp = months[3];
	} else if (dueDate[1] == "05") {
		monapp = months[4];
	} else if (dueDate[1] == "06") {
		monapp = months[5];
	} else if (dueDate[1] == "07") {
		monapp = months[6];
	} else if (dueDate[1] == "08") {
		monapp = months[7];
	} else if (dueDate[1] == "09") {
		monapp = months[8];
	} else if (dueDate[1] == "10") {
		monapp = months[9];
	} else if (dueDate[1] == "11") {
		monapp = months[10];
	} else if (dueDate[1] == "12") {
		monapp = months[11];
	}
	newdate = monapp + " " + dueDate[2] + "," + dueDate[0];
	return newdate;
}

// Function for creating todo list
module.exports.createTodo = function (req, res) {
	dueDate = req.body.dateValue.split("-"); // Splitting date and taking months value
	let newdate = "";
	newdate = DateValeu(dueDate);
	TodoLists.create(
		{
			// Creating new todo and storing into DB
			desc: req.body.desc,
			category: req.body.category,
			dueDate: newdate,
		},
		function (err, newArr) {
			if (err) {
				console.log("Oops error ocurred");
				return;
			}
			return res.redirect("/");
		}
	);
};
// Function for deleting todo list
module.exports.deleteTodo = function (req, res) {
	sp = req.query.id; // Getting the id from ui
	newsp = sp.split(",");
	for (let i = 0; i < newsp.length; i++) {
		TodoLists.findByIdAndDelete(newsp[i], function (err) {
			if (err) {
				console.log("err");
				return;
			}
		});
	}
	return res.redirect("/");
};
// Function for fetching data for edit page
module.exports.EditPage = function (req, res) {
	// Here we are fetching the data which need to be edited
	// console.log(req.query);
	TodoLists.findById(req.query.id, function (err, todoLists) {
		if (err) {
			console.log("Error");
			return;
		}
		return res.render("editPage", {
			title: "Edit Page",
			todolist: todoLists,
		});
	});
};
// Function for updating data after the todo is being edited
module.exports.editDetails = function (req, res) {
	dueDate = req.body.dueDate.split("-"); // Splitting date and taking months value
	let newdate = "";
	newdate = DateValeu(dueDate);
	TodoLists.updateOne(
		{ _id: req.query.id },
		{
			$set: {
				desc: req.body.desc,
				category: req.body.category,
				dueDate: newdate,
			},
		},
		function (err, todoData) {
			if (err) {
				console.log("Error while updating");
				return;
			}
			return res.redirect("/");
		}
	);
};
