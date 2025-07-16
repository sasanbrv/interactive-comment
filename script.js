
//add comment -------------------------------------------------------------------------------
function addComment() {
    const clone = document.querySelector("#commentBox .comments").cloneNode(true)
    const img = clone.querySelector(".comment-img");
    img.src = "./images/avatars/38FAA951-1967-4BD6-91BA-636ECD85CC9E.jpeg"
    img.className = "w-1/12 rounded-full"

    const name = clone.querySelector(".comment-name")
    name.textContent = "Sasan"

    

    const date = clone.querySelector(".comment-date")
    date.textContent = "Today"

    const span = document.createElement("span");
    span.textContent = "You"
    span.className = "mr-4 bg-blue-800 text-white px-1 rounded-lg"
    date.parentNode.insertBefore(span,date);

    const commentText = clone.querySelector(".commentText")
    commentText.textContent = document.getElementById("input-comment").value
    document.getElementById("input-comment").value = "";

    const btns = clone.querySelector("#btns")
    btns.className = "flex justify-between items-center"
    btns.innerHTML = `<button  onclick="openModal(this)" class="flex text-pink-600 mx-6"><img src="./images/icon-delete.svg" alt="" class="px-2 w-full h-auto object-contain py-auto">Delete</button>
    <button onclick="editComment(this)" class="flex text-blue-800 pr-2"><img src="./images/icon-edit.svg" alt="" class="px-2 w-full h-auto object-contain py-auto">Edit</button>`
    document.getElementById("commentBox").appendChild(clone)

}
//------------------------------------------------------------------------------------------------------

// open Confirmed Modal for delete--------------------------------------------------------------------------
let commentToDelete = null
function openModal(btn){
    document.getElementById("deleteCommentModal").style.display = "block";
    commentToDelete = btn.closest(".comment") 
    
}

function deleteComment(){
    commentToDelete.remove();
    dontDelete()
}
function dontDelete(){
    document.getElementById("deleteCommentModal").style.display = "none";
}
// ----------------------------------------------------------------------------------------------------------------

// edit comment ---------------------------------------------------------------------------------------------------
function editComment(btn){
    const comment = btn.closest(".comment")
    const commentBody = comment.querySelector(".comment .commentBody")
    const commentP = comment.querySelector(".comment .commentText")
    

    if (btn.textContent === "Edit"){
        const commentText = commentP.textContent
        const textarea = document.createElement("textarea")
        textarea.className = "textarea resize-none w-full h-20 mr-4 p-2 border-2 rounded-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        textarea.value = commentText
        commentBody.replaceChild(textarea , commentP)
        btn.innerHTML = "Update"

    }
    else if(btn.textContent === "Update"){
        const textarea = commentBody.querySelector(".textarea")
        console.log(textarea)
        const newText = textarea.value
        const newP = document.createElement("p")
        newP.textContent = newText
        newP.className = "whitespace-pre-line commentText"
        commentBody.replaceChild(newP , textarea)
        btn.innerHTML = `<img src="./images/icon-edit.svg" alt="" class="px-2 w-full h-auto object-contain py-auto">Edit`
    }
    
}
//----------------------------------------------------------------------------------------------------------------

// reply comment -------------------------------------------------------------------------------------------------

let  replyTo = null
let replyBox = null 
function replyComment(btn){
    replyBox = document.querySelector(".sendComment").cloneNode(true)
    replyBox.querySelector("#add-comment").textContent = "Reply"
    replyBox.querySelector("#add-comment").setAttribute("onclick" , "addReply(this)")
    replyTo = btn.closest(".comments")
    const addTextarea = replyTo.querySelector(".replyBox ul")
    addTextarea.insertBefore(replyBox , addTextarea.firstChild)
    
}


function addReply(){
   const newReply = document.createElement("div")
   newReply.className = "comment"
   newReply.innerHTML = `<div class="flex justify-between items-center">
                                <div class="flex items-center pb-2">
                                    <img src="./images/avatars/38FAA951-1967-4BD6-91BA-636ECD85CC9E.jpeg" alt="" class="w-1/12 rounded-full">
                                    <span class="ml-4">Sasan</span>
                                    <span class="mx-4 bg-blue-800 text-white px-1 rounded-lg">You</span>
                                    <span class="text-gray-600">Today</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <button  onclick="openModal(this)" class="flex text-pink-600 mx-6"><img src="./images/icon-delete.svg" alt="" class="px-2 w-full h-auto object-contain py-auto">Delete</button>
                                    <button onclick="editComment(this)" class="flex text-blue-800 pr-2"><img src="./images/icon-edit.svg" alt="" class="px-2 w-full h-auto object-contain py-auto">Edit</button>
                                </div>
                            </div>
                            <div class="commentBody">
                                <a class="inline text-blue-700 cursor-pointer">@${replyTo.querySelector(".comment-name").textContent}</a>
                                <p class="commentText inline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>`
    
    newReply.querySelector(".commentText").textContent = replyBox.querySelector("#input-comment").value

    const addNewRply = replyTo.querySelector(".replyBox ul")

    addNewRply.replaceChild( newReply , replyBox)
}
//---------------------------------------------------------------------------------------------------