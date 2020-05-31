export enum actions 
{
    GET_ALL_POSTS = 'GET_ALL_POSTS',
    GET_ONE_POST = 'GET_ONE_POST',
    GET_POST_COMMENTS = 'GET_POST_COMMENTS',
    ADD_POST = 'ADD_POST',
    DELETE_POST = 'DELETE_POST' 
}


export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number,
    comments? : Comment[]
}
export interface Comment {
    postId : number,
    id	: number,
    name: string,
    email: string,
    body : string
}
export interface PostsState
{    
     posts: Post[]
}