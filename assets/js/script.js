let designcl = ["Work", "Personal", "Cleaning", "Others"]; //Creating class for implementing design to different category
$(document).ready(function () {
	let categorys = document.getElementsByClassName("catesec"); // Getting all the class name category
	for (let i = 0; i < categorys.length; i++) {
		if (categorys[i].innerHTML.trim() == "Work") {
			categorys[i].classList.add(designcl[0]);
			categorys[i].classList.add("commonClass");
		} else if (categorys[i].innerHTML.trim() == "Personal") {
			categorys[i].classList.add(designcl[1]);
			categorys[i].classList.add("commonClass");
		} else if (categorys[i].innerHTML.trim() == "Cleaning") {
			categorys[i].classList.add(designcl[2]);
			categorys[i].classList.add("commonClass");
		} else if (categorys[i].innerHTML.trim() == "Others") {
			categorys[i].classList.add(designcl[3]);
			categorys[i].classList.add("commonClass");
		}
	}
});

// This is responsible for making cross line when the id is checked for deletion
function checkedOrNot() {
	let cb = document.querySelectorAll(".delechack"); // Getting all the check-box class
	let descdisp = document.querySelectorAll(".dispdsc"); // Getting all the class where descripting of TODO is defined
	let ddsp = document.querySelectorAll(".dueDate"); // Getting all the class for dueDate
	for (let i = 0; i < descdisp.length; i++) {
		let dueDate = ddsp[i].innerHTML;
		// Checking if checkbox is checked a line will pass through the text(-) else if it is unchecked no line will pass through date and description
		if (cb[i].checked == true) {
			document.getElementById(cb[i].getAttribute("uid")).style.textDecoration =
				"line-through";
			document.getElementById(
				cb[i].getAttribute("uid") + dueDate
			).style.textDecoration = "line-through";
		} else if (cb[i].checked == false) {
			document.getElementById(cb[i].getAttribute("uid")).style.textDecoration =
				"none";
			document.getElementById(
				cb[i].getAttribute("uid") + dueDate
			).style.textDecoration = "none";
		}
	}
}

// This addEventListener come into action when we clicked on delete button after we checked which list of items need to be deleted
document.getElementById("deleteButton").addEventListener("click", function () {
	let checedvaluew = document.querySelectorAll(".delechack:checked"); // Getting only checked vale
	let arrcheck = []; // Creating the lsit of checked array
	for (let i of checedvaluew) {
		let gg = "";
		gg = i.getAttribute("uid"); // Getting uniue id from and pushing into array
		console.log(gg);
		arrcheck.push(gg);
	}
	if (arrcheck.length === 0) {
		// Checking if array is null the
		console.log("No item is checked");
		swal("No item is checked!!!", "please select item to remove!", "error"); // Using show alert to show if there is no items in the array
		return;
	}
	//Here we are making delete request with the help of Ajax request
	$.ajax({
		type: "post",
		url: "/delete_todo/?id=" + arrcheck,
		success: function () {
			// On ajax success i.e when data is delete
			swal("Item is deleted ", "click ok to go back Home ", "success") // Using sweet alert to show the data is delete
				.then((redir) => {
					window.location = "/";
				});
		},
		error: function (err) {
			console.log(err);
		},
	});
});
