import { Model, RelationMapping } from "objection";
import Post from "./posts";


class Comment extends Model{
  id!:number;
  post_id!:number;
  author!:string;
  content!:string;
  timestamps!:boolean
  static get tableName()
  {
    return 'comments'
  }
  static get relationMappings(){
    return {
      post:{
        relation:Model.BelongsToOneRelation,
        modelClass:Post,
        join:{
          from:'comments.post_id',
          to:'posts.id'
        }
      }
    }
  }
}

export default Comment
