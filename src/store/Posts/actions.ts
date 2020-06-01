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
        type: Types.actions.GET_ALL_POSTS as typeof Types.actions.GET_ALL_POSTS, 
    }
}
export const getOnePost = (postId: number) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        postId 
    }
}
export const getPostComments = (postId: number)=> {
    return { 
        type: Types.actions.GET_POST_COMMENTS as typeof Types.actions.GET_POST_COMMENTS,
        postId 
    }
}
export const AddPost = (post: Types.Post)=>{
    return { 
        type: Types.actions.ADD_POST as typeof Types.actions.ADD_POST,
        post 
    }
}
export const DeletePost = (postId: number)=> {
    return { 
        type: Types.actions.DELETE_POST as typeof Types.actions.DELETE_POST,
        postId 
    }
}

// Our return type runtime function -> our nasty "hack"
const getReturnType = <R>(f: (...args: any[]) => R): R => null!

const getAllPostsType = getReturnType(getAllPosts)
const getOnePostType = getReturnType(getOnePost)
const getPostCommentsType = getReturnType(getPostComments)
const AddPostType = getReturnType(AddPost)
const DeletePostType = getReturnType(DeletePost)
export type ActionsType = typeof getAllPostsType | typeof getOnePostType | typeof  getPostCommentsType |typeof AddPostType |typeof  DeletePostType


export const Async_getAllPosts = (posts: Types.Post[])=> {
    return { 
        type: Types.actions.GET_ALL_POSTS as typeof Types.actions.GET_ALL_POSTS, 
        posts
    }
}
export const Async_getOnePost = (post : Types.Post) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        post
    }
}
const Async_getAllPostsType = getReturnType(Async_getAllPosts)
const Async_getOnePostType = getReturnType(Async_getOnePost)
export type Async_ActionsType = typeof Async_getAllPostsType | typeof Async_getOnePostType;