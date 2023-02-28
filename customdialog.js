
export let customAlertFunc = function (alertMsg = "") {
	let dialog = document.querySelector("dialog");

	let alertTemplate = document.querySelector("#alertTemplate");
	let alertTemplateClone = alertTemplate.cloneNode(true);
	alertTemplateClone.content.querySelector("p").innerHTML = alertMsg;
	dialog.innerHTML = alertTemplateClone.innerHTML;

	dialog.querySelector("button").addEventListener("click", function alertClose() {
		dialog.close();
	});

	dialog.showModal();

	dialog.addEventListener("close", function () {
		dialog.innerHTML = '';
	});
}

export let customConfirmFunc = function (confirmMsg = "") {
	let dialog = document.querySelector("dialog");

	let confirmTemplate = document.querySelector("#confirmTemplate");
	let confirmTemplateClone = confirmTemplate.cloneNode(true);
	confirmTemplateClone.content.querySelector("p").innerHTML = confirmMsg;
	dialog.innerHTML = confirmTemplateClone.innerHTML;

	let answer = false ;

	dialog.querySelector("#confirm").addEventListener("click", function () {
		answer = true;
		dialog.close();
	});

	dialog.querySelector("#cancel").addEventListener("click", function () {
		dialog.close();
	});

	dialog.showModal();	

	return new Promise((resolve) => {
		dialog.addEventListener("close", function () {
			resolve(answer);
			dialog.innerHTML = '';
		});
	});
}

export let customPromptFunc = function (promptMsg = "") {
	let dialog = document.querySelector("dialog");

	let promptTemplate = document.querySelector("#promptTemplate");
	let promptTemplateClone = promptTemplate.cloneNode(true);
	promptTemplateClone.content.querySelector("p").innerHTML = promptMsg;
	dialog.innerHTML = promptTemplateClone.innerHTML;

	let answer = null;

	dialog.querySelector("#confirm").addEventListener("click", function () {
		answer = dialog.querySelector("input").value;
		dialog.close();
	});

	dialog.querySelector("#cancel").addEventListener("click", function () {
		dialog.close();
	});

	dialog.showModal();	

	return new Promise((resolve) => {
		dialog.addEventListener("close", function () {
			resolve(answer);
			dialog.innerHTML = '';
		});
	});
}