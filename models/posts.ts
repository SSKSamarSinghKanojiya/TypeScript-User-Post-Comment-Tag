import { Model } from "objection";
import User from "./users";
import Comment from "./comments";
import Tag from "./tags";
import PostTag from "./post_tag";

class Post extends Model {
  id!:number;
  user_id!:number;
  title!:string;
  content!:string;
  timestamps!:boolean
  static get tableName() {
    return "posts";
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: "posts.id",
          through:{
            from:'posts_tags.post_id',
            to:'posts_tags.tag_id'
          },
          to: "tags.id",
        },
      },
    };
  }
}
export default Post;
