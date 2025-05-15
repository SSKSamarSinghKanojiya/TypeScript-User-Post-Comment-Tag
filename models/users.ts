import { Model, RelationMapping } from "objection";
import Post from "./posts";

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  timestamps!:boolean

  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    return {
      post: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.user_id",
        },
      },
    };
  }
}
export default User;
