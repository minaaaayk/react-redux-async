import * as Actions from './actions';
import * as Types from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const fetchPost= async  (url: string, id?:number): Promise<Types.Post | Types.Post[]> => {
    console.log("umad...");
    var newUrl = url;
    if(id !== undefined){
       newUrl = url + '/' + id;
    }
    const response = await fetch(newUrl)
    return response.json()
}


export const PostReducer = (
    state = Types.initialState,
    action: Actions.ActionsType
  ): Types.PostsState =>
   {
    switch (action.type) {
      case Types.actions.GET_ALL_POSTS:{
          var newData:  Types.Post[] = [];
        fetchPost(baseUrl).then((data)=>
         {
            newData = data as Types.Post[];  
            console.log(newData);
            
        });
        return {
            posts: [...newData]
        }
        
        
    }
      case Types.actions.GET_ONE_POST: {
        fetchPost(baseUrl, action.postid).then(data=> {
            console.log(data);
            
        });
        return {
            posts: []
        }
    }
    case Types.actions.GET_POST_COMMENTS:
        return {
            posts:[]
        }
    case Types.actions.ADD_POST:
        return {
            posts: []
        }
    case Types.actions.DELETE_POST:
        return {
            posts:[]
        }
      default:
        return state
    }
  }
