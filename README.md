## <span style="color:#2c7a78">Simple React and Redux project with Async actions Using TypeScript <span>

- requirement: NodeJS
- to run the project use:


# <span style="color:#2c7a78">Steps : <span>
  Note: this project not used redux-thunk
## <span style="color:#2c7a78">1. Create Types in types.ts : <span>
  - type for actions:
  <pre><code> 
  export enum actions {
    GET_ALL_POSTS = 'GET_ALL_POSTS',
    GET_ONE_POST = 'GET_ONE_POST',
    GET_POST_COMMENTS = 'GET_POST_COMMENTS',
    ADD_POST = 'ADD_POST',
    DELETE_POST = 'DELETE_POST' 
  }
</code></pre>
- type for one element of state:
  <pre><code> 
  export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number,
    comments? : Comment[]
    }
    </code></pre>
- type for states:
  <pre><code> 
  export interface PostsState{    
    posts: Post[]
    }
  export const initialState: PostsState = {
    posts: []
    };
    </code></pre>
## <span style="color:#2c7a78">2. Create actions in actions.ts : <span>
  - sync actions:
  <pre><code> 
  export const getOnePost = (postId: number) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        postId 
        }
    }
    //... other actions
</code></pre>
  Note: In the following, sync actions used async action in middlewares.
 - create actionType for sync actions:
  <pre><code> 
  const getReturnType = <R>(f: (...args: any[]) => R): R => null!
  const getAllPostsType = getReturnType(getAllPosts)
  const getOnePostType = getReturnType(getOnePost)
  ....
  export type ActionsType = typeof getAllPostsType | typeof getOnePostType | ....
</code></pre>
- async actions:
  <pre><code> 
  export const Async_getOnePost = (post : Types.Post) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        post
        }
     }
     //... other actions
     </code></pre>
 - create actionType for async actions:
  <pre><code> 
  const getReturnType = <R>(f: (...args: any[]) => R): R => null!
  const Async_getAllPostsType = getReturnType(Async_getAllPosts)
  const Async_getOnePostType = getReturnType(Async_getOnePost)
  ....
  export type Async_ActionsType = typeof Async_getAllPostsType | typeof Async_getOnePostType | ....
  </code></pre>
## <span style="color:#2c7a78">3. Create reducer in reducer.ts : <span>
<pre><code> 
export const PostReducer = (
    state = Types.initialState,
    action: Actions.Async_ActionsType
  ): Types.PostsState =>
   {
    switch (action.type) {
      case Types.actions.GET_ALL_POSTS:{
        return { posts: [...action.posts] }
       }
      case Types.actions.GET_ONE_POST: {
        return {posts:[...state.posts,action.post]}
       }
       .....
      default:
        return state
    }
  }
</code></pre>
## <span style="color:#2c7a78">3. Create middleware to connect between sync actions and async actions : <span>
 - async method:
  <pre><code> 
  const fetchPost = async  (url: string, id?:number): Promise<Types.Post | Types.Post[]> => {
    var newUrl = url;
    if(id !== undefined){
       newUrl = url + '/' + id;
    }
    const response = await fetch(newUrl)
    return response.json()
  }
</code></pre>
- middleware as connector:
<pre><code> 
export const apiMiddleware: Middleware =
 (store) => 
    next => 
        (action:actions.ActionsType) => {
            switch (action.type) {
                case Types.actions.GET_ALL_POSTS:{
                    fetchPost(baseUrl).then((data)=> {
                         next(actions.Async_getAllPosts(data as Types.Post[]))
                    })
                    break;
                }
                case Types.actions.GET_ONE_POST: {
                    const {postId} = action
                    fetchPost(baseUrl, postId).then((data)=> {
                        next(actions.Async_getOnePost(data as Types.Post))
                    })
                    break;
                }
                .......
                default:
                    return next(action)
              }      
        };
</code></pre>

