import * as Actions from './actions';
import * as Types from './types';




export const PostReducer = (
    state = Types.initialState,
    action: Actions.Async_ActionsType
  ): Types.PostsState =>
   {

    console.log("reducer... ");
    switch (action.type) {
      case Types.actions.GET_ALL_POSTS:{
        return {
            posts: [...action.posts]
        }
    }
      case Types.actions.GET_ONE_POST: {
        const newData:  Types.Post[] = [];
        newData.push(action.post);
        var testData = [...newData]
        console.log("testData in reducer...",{posts:[...state.posts,action.post]});
        
        return {posts:[...state.posts,action.post]}
        
    }
    // case Types.actions.GET_POST_COMMENTS:
    //     return {
    //         posts:[]
    //     }
    // case Types.actions.ADD_POST:
    //     return {
    //         posts: []
    //     }
    // case Types.actions.DELETE_POST:
    //     return {
    //         posts:[]
    //     }
      default:
        return state
    }
  }
