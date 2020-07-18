## <span style="color:#2c7a78">Simple React and Redux project with Async actions Using TypeScript <span>

- requirement: NodeJS
- to run the project use:


# <span style="color:#2c7a78">Steps : <span>
  Note: this project not used redux-thunk
## <span style="color:#2c7a78">1. Create Types in types.ts : <span>
  - type for actions:
  ```tsx
  export enum actions {
    GET_ALL_POSTS = 'GET_ALL_POSTS',
    GET_ONE_POST = 'GET_ONE_POST',
    GET_POST_COMMENTS = 'GET_POST_COMMENTS',
    ADD_POST = 'ADD_POST',
    DELETE_POST = 'DELETE_POST' 
  }
```
- type for one element of state:
```tsx
  export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number,
    comments? : Comment[]
    }
```
- type for states:
```tsx 
  export interface PostsState{    
    posts: Post[]
    }
  export const initialState: PostsState = {
    posts: []
    };
```
## <span style="color:#2c7a78">2. Create actions in actions.ts : <span>
  - sync actions:
```tsx
  export const getOnePost = (postId: number) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        postId 
        }
    }
    //... other actions
```
  Note: In the following, sync actions used async action in middlewares.
 - create actionType for sync actions:
```tsx
  const getReturnType = <R>(f: (...args: any[]) => R): R => null!
  const getAllPostsType = getReturnType(getAllPosts)
  const getOnePostType = getReturnType(getOnePost)
  ....
  export type ActionsType = typeof getAllPostsType | typeof getOnePostType | ....
```
- async actions:
```tsx
  export const Async_getOnePost = (post : Types.Post) =>{
    return { 
        type: Types.actions.GET_ONE_POST as typeof Types.actions.GET_ONE_POST,
        post
        }
     }
     //... other actions
```
 - create actionType for async actions:
```tsx
  const getReturnType = <R>(f: (...args: any[]) => R): R => null!
  const Async_getAllPostsType = getReturnType(Async_getAllPosts)
  const Async_getOnePostType = getReturnType(Async_getOnePost)
  ....
  export type Async_ActionsType = typeof Async_getAllPostsType | typeof Async_getOnePostType | ....
```
## <span style="color:#2c7a78">3. Create reducer in reducer.ts : <span>
```tsx
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
```
## <span style="color:#2c7a78">4. Create middleware to connect between sync actions and async actions : <span>
 - async method: 
```tsx
const fetchPost = async  (url: string, id?:number): Promise<Types.Post | Types.Post[]> => {
    var newUrl = url;
    if(id !== undefined){
       newUrl = url + '/' + id;
    }
    const response = await fetch(newUrl)
    return response.json()
  }
```
- middleware as connector:
```tsx
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
```
## <span style="color:#2c7a78">5. Create stores: <span>
- create rootReducer to manage all reducers: 
```tsx
export const rootReducer = combineReducers({
  PostReducer: PostReducer,
  //other reducers...
});
```
- bind reducers and middleware: 
```tsx
export const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
```
## <span style="color:#2c7a78">6. use stors(reducers and actions): <span>
- add states as props: 
```tsx
const mapStateToProps = (State: {
  PostReducer: PostsState;
  /*other reducers*/
  }) => {
    return { posts: State.PostReducer.posts };
    };
```
- add sync actions as props:  
```tsx
const mapDispatcherToProps = (dispatch: Dispatch<actions.ActionsType>) => {
  return {
    getAllPosts: () => dispatch(actions.getAllPosts()),
    getOnePost: (id: number) => dispatch(actions.getOnePost(id)),
    .....
  };
};
```
- create props type: 
```tsx
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;
</code></pre>
- type of App Component: 
<pre><code> 
```tsx
const App: React.FC<ReduxType> = (props) => {
  ....
};
```
- use of actions in App Component: 
```tsx
 <button onClick={() => props.getAllPosts()}>Get All Posts</button>
 <button onClick={() => props.getOnrPost(1)}>Get Post 1</button>
 ....
 ```
- use of states in App Component: 
```tsx
 <ul>
     {props.posts
          ? props.posts.map((p: Post) => <li key={p.id}> {p.title} </li>)
          : ""}
  </ul>
 ```
- map states and actions as props of App Component: 
```tsx
 export default connect(mapStateToProps, mapDispatcherToProps)(App);
```
