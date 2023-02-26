import { loadPosts } from "./postLoader.js";

window.addEventListener("load", init());

function init() {
	let addPostBtn =  document.querySelector("#addPost");

	// load posts from local storage
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	if (posts.length == []) {
		posts.unshift({
			title: "Welcome to my blog!",
			date: "2020-01-01",
			content: "This is my first post. I hope you enjoy it!",
		});

		posts.unshift({
			title: "Post 2",
			date: "2020-01-02",
			content: "This is my second post. I hope you enjoy it!",
		});

		posts.unshift({
			title: "Post 3",
			date: "2020-01-03",
			content: "This is my third post. I hope you enjoy it!",
		});

		localStorage.setItem("posts", JSON.stringify(posts));
	}

	loadPosts(posts);
	
	addPostBtn.addEventListener("click", function () {
		let dialog = document.querySelector("#postDialog");
		let saveBtn = dialog.querySelector("#savePost");
		dialog.showModal();
	});

	let cancelPostBtn = document.querySelector("#cancelPost");

	cancelPostBtn.addEventListener("click", function () {
		let dialog = document.querySelector("#postDialog");
		dialog.close();
	});

	let postForm = document.querySelector("#postForm");

	postForm.addEventListener("submit", function (e) {
		e.preventDefault();
		let postFormTitle = document.querySelector("#postFormTitle");
		let postFormDate = document.querySelector("#postFormDate");
		let postFormContent = document.querySelector("#postFormContent");

		let post = {
			title: postFormTitle.value,
			date: postFormDate.value,
			content: postFormContent.value,
		};

		this.reset();

		let dialog = document.querySelector("#postDialog");
		dialog.close();

		// save post to local storage
		let posts = JSON.parse(localStorage.getItem("posts")) || [];
		posts.unshift(post);
		localStorage.setItem("posts", JSON.stringify(posts));

		loadPosts(posts);
	});

	let dialog = document.querySelector("#postDialog");
	dialog.addEventListener("close", function () {
		document.querySelector("#postForm").reset();
	});

	let updateDialog = document.querySelector("#updateDialog");


}
