const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
    {
        content: String,
        userId: {
            type: ObjectId,
            ref: "User",
        },
        postId: {
            type: ObjectId,
            ref: "Post",
        },
        date: Date,
        dateCreated: Date,
        likes: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;