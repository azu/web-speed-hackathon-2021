import _Sequelize from "sequelize";

const { DataTypes } = _Sequelize;
import { sequelize } from "../sequelize.js";
import { Image } from "./Image.js";
import { Post } from "./Post.js";
const PostsImagesRelation = sequelize.define("PostsImagesRelation", {
    imageId: {
        references: {
            model: Image
        },
        type: DataTypes.STRING
    },
    postId: {
        references: {
            model: Post
        },
        type: DataTypes.STRING
    }
});
export { PostsImagesRelation };
