import { authFetch } from "../utils/authFetch.js";
import { createContext,useContext,useReducer,useEffect } from "react";
const ApplicationContext=createContext();

const initialState={
    applications:[],
    loading:false,
    error:null,
    actionLoading:false,
}
function applicationReducer(state,action){
    switch(action.type){
        case "LOADING":
            return{
                ...state,
                loading:true,
                error: null,
            }
        case "SET_APPLICATIONS":
            return{
                ...state,
                applications:action.payload,
                loading:false,error:null,
            }
        case "ERROR":
            return{
                ...state,
                loading: false,
                actionLoading:false,
                error:action.payload
            }    
        case "ACTION_LOADING":
            return{
                ...state,
                actionLoading:true,
                error:null,
            }
        case "ACTION_DONE":
            return{
                ...state,
                actionLoading:false,
            } 

        case "ADD_APPLICATION":
            return{
                ...state,
                applications:[...state.applications, action.payload],
            }
        case "DELETE_APPLICATION":
            return{
                ...state,
                applications:[...state.applications.filter(
                    (app)=>app._id!==action.payload
                ),]
            }  
        case "UPDATE_STATUS":
            return{
                ...state,
                applications:state.applications.map((app)=>
                    app._id=== action.payload.id? {...app,status:action.payload.status} :app
                ),
            }  
        case "EDIT_APPLICATION":
            return{
                ...state,
                applications:state.applications.map((app)=>
                    app._id=== action.payload.id?{...app, ...action.payload.updates}:app
                ),
            }        
            default:
                return state

    }
}

export function ApplicationProvider({children}){
    const [state,dispatch]=useReducer(applicationReducer,initialState)

    useEffect(()=>{
        async function loadApplications(){
            const token= localStorage.getItem("token")
            if(!token) return
            
            dispatch({type:"LOADING"})
            try{
                const res = await authFetch("http://localhost:5001/api/applications")
                               
                if(!res.ok){
                    if(res.status === 401 ){
                    
                    dispatch({
                        type:"ERROR",
                        payload:"Unauthorized.Please login again"
                    })
                    return
                    }
                    throw new Error ("Request failed" )
                }
                
                const data= await res.json()
                dispatch({type:"SET_APPLICATIONS",payload: data})
            }
            catch(err){
                dispatch({
                    type: "ERROR",
                    payload:"Failed to load Applications. Please try again.",
                })                
            }            
        }
        loadApplications();
    }, [])
        
        
        
    return(
        <ApplicationContext.Provider value={{state,dispatch}}>
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplications(){
    return useContext(ApplicationContext)
}
