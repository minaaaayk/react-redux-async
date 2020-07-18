## <span style="color:#2c7a78">Simple React and Redux project with Async actions Using TypeScript <span>

- requirement: NodeJS
- to run the project use:


# <span style="color:#2c7a78">Steps : <span>
## <span style="color:#2c7a78">1. Create Type in types.ts : <span>
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
