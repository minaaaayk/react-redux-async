// our Action creators
import * as Types from './types';

// export function typedAction<T extends string>(type: T): { type: T };
// export function typedAction<T extends string, P extends any>(
//   type: T,
//   payload: P
// ): { type: T; payload: P };
// export function typedAction(type: string, payload?: any) {
//   return { type, payload };
// }

// export const login = (username: string) => {
//     return typedAction('user/LOGIN', username);
//   };export const logout = () => {
//     return typedAction('user/LOGOUT');
//   };type UserAction = ReturnType<typeof login | typeof logout>;

  
export const getAllPosts = ()=> {
    return { 
        type: Types.actions.GET_ALL_POSTS as typeof Types.actions.GET_ALL_POSTS 
    }
}
export const getOnePost = (postid: number) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        postid 
    }
}
export const GET_POST_COMMENTS = (postid: number)=> {
    return { 
        type: Types.actions.GET_POST_COMMENTS as typeof Types.actions.GET_POST_COMMENTS,
        postid 
    }
}
export const AddPost = (post: Types.Post)=>{
    return { 
        type: Types.actions.ADD_POST as typeof Types.actions.ADD_POST,
        post 
    }
}
export const DeletePost = (postid: number)=> {
    return { 
        type: Types.actions.DELETE_POST as typeof Types.actions.DELETE_POST,
        postid 
    }
}

// Our return type runtime function -> our nasty "hack"
const getReturnType = <R>(f: (...args: any[]) => R): R => null!

const getAllPostsType = getReturnType(getAllPosts)
const getOnePostType = getReturnType(getOnePost)
const GET_POST_COMMENTSType = getReturnType(GET_POST_COMMENTS)
const AddPostType = getReturnType(AddPost)
const DeletePostType = getReturnType(DeletePost)

export type ActionsType = typeof getAllPostsType | typeof getOnePostType | typeof  GET_POST_COMMENTSType |typeof AddPostType |typeof  DeletePostType