import { Middleware } from "redux";
import * as actions from './store/Posts/actions'
import  * as Types  from './store/Posts/types'


const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const fetchPost = async  (url: string, id?:number): Promise<Types.Post | Types.Post[]> => {
    console.log("start fetching....");
    
    var newUrl = url;
    if(id !== undefined){
       newUrl = url + '/' + id;
    }
    const response = await fetch(newUrl)
    console.log("end fetching....");
    return response.json()
}



export const apiMiddleware: Middleware =
 (store) => 
    next => 
        (action:actions.ActionsType) => {
            console.log("middleWare... ");
            console.log(action.type);
            switch (action.type) {
                case Types.actions.GET_ALL_POSTS:{
                    fetchPost(baseUrl).then((data)=> {
                         next(actions.Async_getAllPosts(data as Types.Post[]))
                    })
                    break;
                }
                case Types.actions.GET_ONE_POST: {
                    const {postId} = action
                    console.log("middleWare GET_ONE_POST  ", postId);
                    fetchPost(baseUrl, postId).then((data)=> {
                        console.log("middleWare{data} : ", data);
                        next(actions.Async_getOnePost(data as Types.Post))
                        console.log('[Middleware] next state', store.getState());
                    }).catch((err)=>console.log(err)).finally(()=>console.log("finished"))
                    //console.log('[Middleware] next state : ', store.getState());
                    break;
                }
                case Types.actions.GET_POST_COMMENTS:{
                    return next(action)
                }
                case Types.actions.ADD_POST:{
                    return next(action)
                }
                case Types.actions.DELETE_POST:{
                    return next(action)
                }
                    
                default:
                    return next(action)
              }      
        };
