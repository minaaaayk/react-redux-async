import * as Actions from './actions';
import * as Types from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts/'

const fetchPost= async  (url: string, id?:number): Promise<Types.Post | Types.Post[]> => {
    if(id){
        const response = await fetch(url)
        const { data } = await response.json()
        return data
    }
    const response = await fetch(url + '/' + id)
    const { data } = await response.json()
    return data
    
}


export const chatReducer = (
    state = Types.initialState,
    action: Actions.ActionsType
  ): Types.PostsState =>
   {
    switch (action.type) {
      case Types.actions.GET_ALL_POSTS:
        fetchPost(baseUrl).then(data=> {
            console.log(data);
            
        });
        return {
            posts: []
        }
      case Types.actions.GET_ONE_POST:
        fetchPost(baseUrl, action.postid).then(data=> {
            console.log(data);
            
        });
        return {
            posts: []
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
