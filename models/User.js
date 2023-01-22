const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
        },
        cif: {
            type: String,
        },
        isAssociation: {
            type: Boolean,
            default: false,
        },
        birthdate: {
            type: String,
        },
        password: {
            type: String,
        },
        tokens: [],
        isAdmin: { type: Boolean, default: false },
        postIds: [{ type: ObjectId, ref: "Post" }],
        image_path: { type: String }
    },
    { timestamps: true }
);
UserSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
