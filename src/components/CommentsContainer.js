import React from "react";

const commentsData = [
  {
    name: "Bharat",
    text: "Lorem Ipsum is simply dummy text of the printing",
    replies: [],
  },
  {
    name: "Bharat",
    text: "Lorem Ipsum is simply dummy text of the printing",
    replies: [
      {
        name: "Bharat",
        text: "Lorem Ipsum is simply dummy text of the printing",
        replies: [
          {
            name: "Bharat",
            text: "Lorem Ipsum is simply dummy text of the printing",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Bharat",
    text: "Lorem Ipsum is simply dummy text of the printing",
    replies: [
      {
        name: "Bharat",
        text: "Lorem Ipsum is simply dummy text of the printing",
        replies: [],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex bg-gray-100 p-2 rounded-lg">
      <img
        className="w-8 h-8"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="comment-user"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
        {/* <p>{replies}</p> */}
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
    // Disclaimer: Don't use indexes as keys
    return comments.map((comment, index) => (
      <div key={index}>
        <Comment data={comment} />
        <div className="pl-5 border border-l-black ml-5">
          <CommentsList comments={comment.replies} />
        </div>
      </div>
    ));
  };
  
  const CommentsContainer = () => {
    return (
      <div className="m-5 p-2">
        <h1 className="text-2xl font-bold">Comments: </h1>
        <CommentsList comments={commentsData} />
      </div>
    );
  };

export default CommentsContainer;
