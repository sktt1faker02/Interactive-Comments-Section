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
  renderCurrentComments(comments);
};

getComments();

// Render Current Comments

const renderCurrentComments = function (data) {
  console.log(data);
  data.comments.map(
    ({ content, createdAt, user, score, replies } = comments) => {
      if (replies.length < 1) {
        createCommentEl(content, createdAt, user, score, (repCount = false));
      } else {
        createCommentEl(
          content,
          createdAt,
          user,
          score,
          (repCount = true),
          replies
        );

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
    }
  );

  appendReplyEl();
  replyCommentEl(mainEl);
};

/* Create Element */
const createCommentEl = function (
  getContent,
  getCreatedAt,
  getUser,
  getScore,
  getRepCount = false,
  reply
) {
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
                <div class ="${haveReplies}">
                ${createReplyCommentEl(reply)}
                </div>
        </section>
          `;

  //   const removeComma = document.querySelectorAll(".have__replies");
  //   removeComma.forEach((e) => {
  //     // console.log(e.childNodes.item);
  //   });
};

const createReplyCommentEl = function (reply) {
  return reply.map(({ content, createdAt, user, score } = rep) => {
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
             `;
  });
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
  const replyBtn = document.querySelectorAll(".comment__footer-reply-btn");
  replyBtn.forEach((e) => {
    e.addEventListener("click", () => {
      //   console.log(e.parentElement.parentElement);
      const parentAppend = e.closest(".comment__container");
      replyCommentEl(parentAppend);
    });
  });
};

/* Render Init Reply */

const replyCommentEl = function (parentAppend) {
  // Create the elements
  const replyDiv = document.createElement("div");
  replyDiv.classList.add("comment__reply");

  const replyTextarea = document.createElement("textarea");
  replyTextarea.classList.add("comment__reply-text");
  replyTextarea.setAttribute("type", "text");
  replyTextarea.setAttribute("placeholder", "Add a comment...");

  const replyCurrentUserDiv = document.createElement("div");
  replyCurrentUserDiv.classList.add("comment__reply-current-user");

  const replyCurrentUserImg = document.createElement("img");
  replyCurrentUserImg.setAttribute(
    "src",
    "./images/avatars/image-juliusomo.webp"
  );
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

  parentAppend.appendChild(replyDiv);
};
