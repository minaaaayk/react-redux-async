import React from 'react';
import './App.css';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PostsState,Post } from './store/Posts/types';
import * as actions from './store/Posts/actions';

const mapStateToProps = ({ posts }: PostsState) => {
  return { posts };
}

const mapDispatcherToProps = (dispatch: Dispatch<actions.ActionsType>) => {
    return {
        getAllPosts: () => dispatch(actions.getAllPosts()),
        getOnrPost:  (id:number) => dispatch(actions.getOnePost(id)),
        getPostComments: (postId: number) => dispatch(actions.getPostComments(postId)),
        DeletePost: (postId:number) => dispatch(actions.DeletePost(postId)),
        AddPost: (post:Post) => dispatch(actions.AddPost(post))
    }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

const App:React.FC<ReduxType> = props => {
  return (
    <div className="App">
      <button onClick={() => props.getAllPosts}>Get All Posts</button>
      <button onClick={() => props.getOnrPost(1)}>Get Post 1</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
