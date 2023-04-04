// TODO: UPDATE FUNCTION

// Elements
const mainEl = document.querySelector(".main");
const sectionReplyEl = document.querySelector(".reply-container");

// const commentContainer = document.querySelectorAll(".comment__container");

/* Get Data From Sample API */
const getCommentsData = fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.log(error));

const getComments = async () => {
  const comments = await getCommentsData;
  //   comments.comments.map((data) => renderCurrentComments(data));

  commentData(comments);
  // sampleInsert(comments);
};

getComments();

/* Clone the Data */
let commentDataArr = [];
const commentData = function (data) {
  commentDataArr.push(data);
  console.log(commentDataArr);
  renderCurrentComments(commentDataArr[0]);
};

// Render Current Comments

const renderCurrentComments = function (data) {
  console.log(data);

  data.comments.map(({ id, content, createdAt, user, score, replies } = comments) => {
    let repCount = false;
    if (replies.length < 1) {
      createCommentEl(id, content, createdAt, user, score, (repCount = false));
    } else {
      createCommentEl(id, content, createdAt, user, score, (repCount = true), replies);
      // console.log(mainUserComment, replies);
      // replies.map(({ content, createdAt, user, score, replyingTo } = rep) => {
      //   console.log(replyingTo);
      // });
      // replies.map(({ content, createdAt, user, score } = rep) => {
      //     console.log(content);
      // createReplyCommentEl(
      //     content,
      //     createdAt,
      //     user,
      //     score,
      //     mainUserComment
      //   );
      // });
    }
  });

  mainEl.innerHTML += `<div class="comment__reply comment__reply-main">
<textarea type="text" class="comment__reply-text" placeholder="Add a comment..."></textarea>

<div class="comment__reply-current-user">
  <img src="./images/avatars/image-juliusomo.webp" alt="image-juliusomo" />
  <button class="button comment__reply-btn-send btn__send-main">Send</button>
</div>
</div

`;

  // For Main Reply Comment Only

  const btnSendMain = document.querySelector(".btn__send-main");

  btnSendMain.addEventListener("click", () => {
    const commentTxt = btnSendMain.parentElement.parentElement.firstElementChild.value;
    if (!commentTxt) return;
    // const username = commentDataArr[0].currentUser.username;
    // const userImg = commentDataArr[0].currentUser.image.webp;

    const replyObj = {
      id: new Date().valueOf(),
      content: commentTxt,
      createdAt: "Just now",
      score: 0,
      user: commentDataArr[0].currentUser,
      replies: [],
    };

    commentDataArr[0].comments.push(replyObj);
    mainEl.innerHTML = "";
    renderCurrentComments(commentDataArr[0]);
  });
  appendReplyEl();
  currentUserComment();

  deleteComment();
  // replyCommentEl(mainEl);
};

/* Create Element */
const createCommentEl = function (getID, getContent, getCreatedAt, getUser, getScore, getRepCount = false, reply) {
  const haveReplies = getRepCount === true ? "have__replies" : "no__replies";
  //   console.log(haveReplies);

  mainEl.innerHTML += `
  <section class ="comment__container ">
          <div class="comment">
                  <div class="comment__header">
                    <img
                      class="comment__header-user-avatar"
                      src="${getUser.image.webp}"
                      alt="image-amyrobson"
                    />
                    <p class="comment__header-username">${getUser.username}</p>
                    <p class="comment__header-posted-time">${getCreatedAt}</p>
                    <p class="comment__header-userid">${getID}</p>
                  </div>
                  <p class="comment__content">
              ${getContent}
                  </p>
                  <div class="comment__footer">
                    <div class="comment__footer-vote">
                      <button class="comment__footer-vote-btn-plus">
                        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            fill="#C5C6EF"
                          ></path>
                        </svg>
                      </button>
                      <p class="comment__footer-vote-vote-counter">${getScore}</p>
                      <button class="comment__footer-vote-btn-minus">
                        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            fill="#C5C6EF"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div class="crud-buttons">
                    <button class="comment__footer-reply-btn js__reply-btn">
                      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"></path>
                      </svg>
                      Reply
                    </button>
        
                    <button class="comment__footer-reply-btn js__delete-btn">
                      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
                      Delete
                    </button>
        
                    <button class="comment__footer-reply-btn js__edit-btn">
                      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
                      Edit
                    </button>
                  </div>
                  </div>
                </div>

                <div class="reply__input"></div>
                <div class ="${haveReplies}">

                ${createReplyCommentEl(reply)}
                </div>
        </section>

        <div class="wrapper">
        <div class="modal">
          <p class="modal__delete-title">Delete comment</p>
          <p class="modal__delete-content">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div class="modal__confirmation">
            <button class="modal__confirmation-cancel modal__confirmation-btn">no, cancel</button>
            <button class="modal__confirmation-delete modal__confirmation-btn">yes, delete</button>
          </div>
        </div>
      </div>

     
          `;
};

const createReplyCommentEl = function (reply) {
  if (reply === undefined) {
    return "";
  } else {
    return reply
      .map(({ id, content, createdAt, user, score } = rep) => {
        // console.log(id);
        return `
    <section class="reply-container">
             <div class="comment">
                     <div class="comment__header">
                       <img
                         class="comment__header-user-avatar"
                         src="${user.image.webp}"
                         alt="image-amyrobson"
                       />
                       <p class="comment__header-username">${user.username}</p>
                       <p class="comment__header-posted-time">${createdAt}</p>
                       <p class="comment__header-userid">${id}</p>
                     </div>
                     <p class="comment__content">
                 ${content}
                     </p>
                     <div class="comment__footer">
                       <div class="comment__footer-vote">
                         <button class="comment__footer-vote-btn-plus">
                           <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                             <path
                               d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                               fill="#C5C6EF"
                             ></path>
                           </svg>
                         </button>
                         <p class="comment__footer-vote-vote-counter">${score}</p>
                         <button class="comment__footer-vote-btn-minus">
                           <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                             <path
                               d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                               fill="#C5C6EF"
                             ></path>
                           </svg>
                         </button>
                       </div>
                       <div class="crud-buttons">
            <button class="comment__footer-reply-btn js__reply-btn">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"></path>
              </svg>
              Reply
            </button>

            <button class="comment__footer-reply-btn js__delete-btn">
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
              Delete
            </button>

            <button class="comment__footer-reply-btn js__edit-btn">
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
              Edit
            </button>
          </div>
                     </div>
                   </div>

                   <div class="reply__input"></div>
                   </section>
             `;
      })
      .join("");
  }
};

//const createReplyCommentEl1 = function (
//   getContent,
//   getCreatedAt,
//   getUser,
//   getScore,
//   getMainUsernameComment
//reply
//) {
//console.log(reply);

// const haveReplies = document.querySelectorAll(".have__replies");
//console.log(haveReplies);
// haveReplies.forEach((replyEl, i) => {
// console.log(replyEl);
// console.log(reply[i]);
// const { content, createdAt, user, score } = reply[i];
// reply.map(({ content, createdAt, user, score, replyingTo } = rep) => {
//   console.log(replyingTo);
// });
/*   replyEl.innerHTML += `
  <section class="reply-container">
            <div class="comment">
                    <div class="comment__header">
                      <img
                        class="comment__header-user-avatar"
                        src="${user.image.webp}"
                        alt="image-amyrobson"
                      />
                      <p class="comment__header-username">${user.username}</p>
                      <p class="comment__header-posted-time">${createdAt}</p>
                    </div>
                    <p class="comment__content">
                ${content}
                    </p>
                    <div class="comment__footer">
                      <div class="comment__footer-vote">
                        <button class="comment__footer-vote-btn-plus">
                          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                              fill="#C5C6EF"
                            ></path>
                          </svg>
                        </button>
                        <p class="comment__footer-vote-vote-counter">${score}</p>
                        <button class="comment__footer-vote-btn-minus">
                          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                              fill="#C5C6EF"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <button class="comment__footer-reply-btn">
                        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                            fill="#5357B6"
                          ></path>
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                  </section>
            `; */
// });

//  const divReplyContainer = document.createElement("div");
// divReplyContainer.classList.add("have__replies-container");
//};

/* Create Reply Element */

const appendReplyEl = function () {
  const replyBtn = document.querySelectorAll(".js__reply-btn");
  replyBtn.forEach((e, i) => {
    e.addEventListener("click", () => {
      const mainThread = e.closest(".comment__container");
      let parentAppend = "";
      // console.log(e.parentElement.parentElement.parentElement);
      const username = "@" + e.parentElement.parentElement.parentElement.querySelector(".comment__header .comment__header-username").textContent + " ";
      if (e.parentElement.parentElement.parentElement.parentElement.className !== "reply-container") {
        parentAppend = e.closest(".comment__container").querySelector(".reply__input");
      } else {
        parentAppend = e.parentElement.parentElement.parentElement.parentElement.querySelector(".reply__input");
        e.parentElement.parentElement.parentElement.parentElement.querySelector(".reply__input").style.marginTop = "1rem";
      }

      if (parentAppend.classList.contains("show__reply-input")) {
        // parentAppend.remove;
        document.querySelectorAll(".reply__input")[i].classList.remove("show__reply-input");
        parentAppend.removeChild(parentAppend.firstElementChild);

        return;
      }

      document.querySelectorAll(".reply__input")[i].classList.add("show__reply-input");

      // console.log(parentAppend);

      replyCommentEl(parentAppend, username, mainThread);
    });
  });
};

/* Render Init Reply */

const replyCommentEl = function (parentAppend, username, id) {
  // Create the elements
  const replyDiv = document.createElement("div");
  replyDiv.classList.add("comment__reply");

  const replyTextarea = document.createElement("textarea");
  replyTextarea.classList.add("comment__reply-text");
  replyTextarea.setAttribute("type", "text");
  replyTextarea.setAttribute("placeholder", "Add a comment...");
  replyTextarea.innerText = username;

  const replyCurrentUserDiv = document.createElement("div");
  replyCurrentUserDiv.classList.add("comment__reply-current-user");

  const replyCurrentUserImg = document.createElement("img");
  replyCurrentUserImg.setAttribute("src", "./images/avatars/image-juliusomo.webp");
  replyCurrentUserImg.setAttribute("alt", "image-juliusomo");

  const replyBtnSend = document.createElement("button");
  replyBtnSend.classList.add("button", "comment__reply-btn-send");
  replyBtnSend.innerText = "Send";

  // Append the elements
  replyCurrentUserDiv.appendChild(replyCurrentUserImg);
  replyCurrentUserDiv.appendChild(replyBtnSend);

  replyDiv.appendChild(replyTextarea);
  replyDiv.appendChild(replyCurrentUserDiv);

  // Append the replyDiv to the parent element
  // console.log(parentAppend);

  parentAppend.appendChild(replyDiv);

  replyTextarea.selectionStart = replyTextarea.value.length;
  replyTextarea.selectionEnd = replyTextarea.value.length;
  replyTextarea.focus();
  appendMessage(username, id);
};

// Append Comments Message
const appendMessage = function (replyingTo, mainComment) {
  const sendBtn = document.querySelectorAll(".comment__reply-btn-send").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      // console.log("Hello");
      const commentTxt = btn.parentElement.parentElement.firstChild.value;

      if (!commentTxt) return;
      // console.log(commentTxt);
      insertReply(commentDataArr, commentTxt, replyingTo, mainComment);
      btn.parentElement.parentElement.remove();
    });
  });
};

const insertReply = function (data, comments, replyingTo, threadStarter) {
  const replyObj = {
    id: new Date().valueOf(),
    content: comments,
    createdAt: "Just now",
    replyingTo: replyingTo.trim(),
    score: 0,
    user: data[0].currentUser,
  };
  const mainUserComment = threadStarter.querySelector(".comment .comment__header .comment__header-username").innerText;

  const filterId = data[0].comments.findIndex((c) => c.user.username === mainUserComment);

  // console.log(filterId);
  data[0].comments[filterId].replies.push(replyObj);
  mainEl.innerHTML = "";

  renderCurrentComments(commentDataArr[0]);
  // currentUserComment();
};

// Replace Reply to Edit and Delete for the current user

const currentUserComment = function () {
  const comment = document.querySelectorAll(".comment");
  comment.forEach((c) => {
    if (c.firstElementChild.querySelector(".comment__header-username").textContent !== commentDataArr[0].currentUser.username) {
      // c.firstElementChild.querySelector(".comment__header-username").textContent = "wews";
      c.querySelector(".comment__footer .crud-buttons .js__delete-btn").style.display = "none";
      c.querySelector(".comment__footer .crud-buttons .js__edit-btn").style.display = "none";
      c.querySelector(".comment__footer .crud-buttons .js__delete-btn").classList.remove("js__delete-btn");
      c.querySelector(".comment__footer .crud-buttons .js__edit-btn").classList.remove("js__edit-btn");
    } else {
      c.querySelector(".comment__footer .crud-buttons .js__reply-btn").style.display = "none";
    }
  });

  // console.log(comment);
};

// Delete Function
const deleteComment = function () {
  const delEl = document.querySelectorAll(".js__delete-btn");
  delEl.forEach((e) => {
    e.addEventListener("click", () => {
      // console.log("Hello");

      document.querySelector(".wrapper").classList.add("show-modal");
      disableScroll();
      const confirmYesDel = document.querySelector(".modal__confirmation-delete ");
      const confirmNoDel = document.querySelector(".modal__confirmation-cancel ");

      confirmYesDel.addEventListener("click", () => {
        document.querySelector(".wrapper").classList.remove("show-modal");

        if (e.parentElement.parentElement.parentElement.parentElement.className !== "reply-container") {
          const userid = e.parentElement.parentElement.parentElement.parentElement.querySelector(".comment .comment__header .comment__header-userid").textContent;
          console.log(userid);
          const deleteRecord = commentDataArr[0].comments.filter((record) => {
            return record.id === +userid;
          });

          console.log(deleteRecord[0].id);
          commentDataArr[0].comments.splice(
            commentDataArr[0].comments.findIndex((del) => del.id === deleteRecord[0].id),
            1
          );
        } else {
          const userid = e.parentElement.parentElement.parentElement.parentElement.querySelector(".comment .comment__header .comment__header-userid").textContent;
          const parentid = e.parentElement.closest(".comment__container").querySelector(".comment .comment__header .comment__header-userid").textContent;

          const deleteRecord = commentDataArr[0].comments.filter((record) => {
            return record.id === +parentid;
          });

          const deleteRecordIndex = commentDataArr[0].comments.findIndex((record) => {
            return record.id === +parentid;
          });

          const deleteRecordChild = deleteRecord[0].replies.filter((rep) => {
            return rep.id === +userid;
          });

          // const x = commentDataArr[0].comments.filter((c) => c.id === +parentid);

          commentDataArr[0].comments[deleteRecordIndex].replies.splice(
            commentDataArr[0].comments[deleteRecordIndex].replies.findIndex((del) => del.id === deleteRecordChild[0].id),
            1
          );

          console.log(commentDataArr[0]);
        }

        mainEl.innerHTML = "";
        renderCurrentComments(commentDataArr[0]);
        enableScroll();
      });

      confirmNoDel.addEventListener("click", () => {
        document.querySelector(".wrapper").classList.remove("show-modal");
        console.log("Cancelled");
        enableScroll();
        return;
      });
    });
  });
};

// Call Modal

function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "initial";
}
