import { Model } from "objection";
import Post from "./posts";


class Tag extends Model{
  id!:number;
  name!:string
  static get tableName()
  {
    return 'tags'
  }
  static get relationMappings(){
    return{
      posts:{
        relation:Model.ManyToManyRelation,
        modelClass:Post,
        join:{
          from:'tags.id',
          through:{
            from:'posts_tags.tag_id',
            to:'posts_tags.post_id'
          },
          to:'posts.id'
        }
      }
    }
  }
}


export default Tag
