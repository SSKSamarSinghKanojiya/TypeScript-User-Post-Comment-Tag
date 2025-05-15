import { Model } from "objection";

class PostTag extends Model {
  post_id!: number;
  tag_id!: number;

  static get tableName() {
    return "posts_tags";
  }

  static get idColumn() {
    return ["post_id", "tag_id"]; // Composite primary key
  }
}

export default PostTag;
