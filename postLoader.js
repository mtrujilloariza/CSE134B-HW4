import { customConfirmFunc } from "./customdialog.js";
import { deletePost, updatePost } from "./postUpdater.js";

export let loadPosts = function (posts) {
	let postDiv = document.querySelector("#posts");
	postDiv.innerHTML = '';
	for (let post of posts) {
		let postTemplate = document.querySelector("#postTemplate");
		let postTemplateClone = postTemplate.cloneNode(true);

		postTemplateClone.content.querySelector(".postTitle").innerHTML = post.title;
		postTemplateClone.content.querySelector(".postDate").innerHTML = post.date;
		postTemplateClone.content.querySelector(".postContent").innerHTML = post.content;

		// add event listener to delete button
		postTemplateClone.content.querySelector(".delete").addEventListener("click", function () {
			let deleteAns = customConfirmFunc("Are you sure you want to delete this post?");
			 deleteAns.then(function (answer) {
				if (answer) {
					deletePost(posts.indexOf(post));
				} 
			});
		});

		// add event listener to edit button
		postTemplateClone.content.querySelector(".edit").addEventListener("click", function () {
			let dialog = document.querySelector("#updateDialog");
			//get update form template and clone it
			let updateFormTemplate = document.querySelector("#updateFormTemplate");
			let updateFormTemplateClone = updateFormTemplate.cloneNode(true);
			//add the cloned template to the dialog
			dialog.innerHTML = updateFormTemplateClone.innerHTML;

			dialog.querySelector("#updateFormTitle").value = post.title;
			dialog.querySelector("#updateFormDate").value = post.date;
			dialog.querySelector("#updateFormContent").value = post.content;

			dialog.showModal();

			dialog.addEventListener("close", function () {
				dialog.innerHTML = '';
			});

			dialog.querySelector("#cancelUpdate").addEventListener("click", function () {
				dialog.close();
			});

			dialog.querySelector("#updatePostForm").addEventListener("submit", function (e) {
				e.preventDefault();
				updatePost(posts.indexOf(post), dialog.querySelector("#updateFormTitle").value, dialog.querySelector("#updateFormDate").value, dialog.querySelector("#updateFormContent").value);
				dialog.close();
			});

		});

		postDiv.appendChild(postTemplateClone.content);
	}
}