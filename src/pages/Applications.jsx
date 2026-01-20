import {useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import {useApplications} from "../context/ApplicationContext";
import { authFetch } from '../utils/authFetch.js';

import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Form from '../components/ui/Form.jsx';
import Select from '../components/ui/Select.jsx';
import StatusSelect from '../components/ui/StatusSelect.jsx';

export default function Applications(){
    const {state,dispatch}=useApplications()
    const {applications,loading, error, actionLoading}= state
    const[company,setCompany]=useState("")
    const[role,setRole]=useState("")
    const [editingId,setEditingId]=useState(null)
    const [editValues, setEditValues]=useState({company:"",role:""})
    const [searchText,setSearchText]=useState("")
    const[statusFilter, setStatusFilter]=useState("ALL")
    const[params]=useSearchParams()
    const API_URL = import.meta.env.VITE_API_URL;


    const dashboardFilter=params.get("status")
    const visibleApplications= dashboardFilter? applications.filter(a=>a.status === dashboardFilter):applications



    async function handleSubmit(e){
        e.preventDefault()
        if(!company.trim() || !role.trim()) return

        dispatch({type:"ACTION_LOADING"})
        try{
            const res= await authFetch(`${API_URL}/api/applications`,{
                method:"POST",                                        
                body: JSON.stringify({company,role,})                                                        
            })
            if(!res.ok){
                const errData= await res.json()
                throw new Error (errData.message || "Failed to add application")
            }

            const saved= await res.json()

            dispatch({type:"ADD_APPLICATION", payload: saved})
            setCompany("")
            setRole("")
        }catch(err){
            dispatch({
                type:"ERROR",
                payload:"Failed to add Application."
            })
        }finally{
            dispatch({type:"ACTION_DONE"})
        }
        
        
    }
    function startEdit(app){
        setEditingId(app._id)
        setEditValues({company:app.company, role:app.role})
    }
    async function saveEdit(){
        dispatch({type:"ACTION_LOADING"})

        try{
            const res= await authFetch(`${API_URL}/api/applications/${editingId}`,{
            method:"PUT",
            
            body:JSON.stringify({
                company:editValues.company,
                role:editValues.role,
            })

            })
            const updated= await res.json()                    
            dispatch({
                type:"EDIT_APPLICATION",
                payload:{id:updated._id, updates:updated}
            }),
            setEditingId(null)
            setEditValues({company:"",role:""})

        }catch(err){
            dispatch({
                type:"ERROR",
                payload:"Failed to update application."
            })
        }finally{
            dispatch({type:"ACTION_DONE"})
        }
        
    }
    async function handleDelete(id){
        if(!window.confirm("Delete this application")) return
        dispatch({type:"ACTION_LOADING"})

        try{
            const res= await authFetch(`${API_URL}/api/applications/${id}`,{
                method:"DELETE",

            })
            dispatch({type:"DELETE_APPLICATION",payload:id})        
            
        }catch(err){
            dispatch({
                type:"ERROR",
                payload:"Failed to delete application."
            })
        }finally{
            dispatch({type:"ACTION_DONE"})
        }
    }

    const filteredApplications= visibleApplications.filter((app)=>app.company.toLowerCase().includes(searchText.toLowerCase()))
        .filter((app)=> statusFilter ==="ALL"? true : app.status === statusFilter)
    


    async function handleStatusChange(id,newStatus){
        dispatch({type:"ACTION_LOADING"})
        try{
            const res = await authFetch(`${API_URL}/api/applications/${id}`,{
                method:"PUT",
                
                body:JSON.stringify({status: newStatus}),
            })
            const updated = await res.json()
            dispatch({
                type:"UPDATE_STATUS",
                payload:{id:updated._id,status:updated.status},
            })
        }catch(err){
            dispatch({
                type:"ERROR",
                payload:"Failed to update"
            })
        }finally{
            dispatch({type:"ACTION_DONE"})
        }
    }
    return(
        <div className="space-y-10">
            <div className="pb-4 border-b border-slate-200">
                <h2 className="text-3xl font-bold">Applications</h2>
                <p className='text-sm text-slate-500 mt-1'>Track and Manage your job applications </p>
            </div>
            
            {loading && <p className="text-slate-500 text-sm animate-pulse"> Loading applications...</p>}
            {error && <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2" > {error} </p>}

            <Card className="bg-white border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-5">
                    Add Application
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input 
                        className='h-11'                   
                        type='text'
                        placeholder='Company'
                        value={company}
                        onChange={(e)=>setCompany(e.target.value)} />

                        <Input    
                        className='h-11'                 
                        type="text"
                        placeholder='Role' 
                        value={role}
                        onChange={(e)=>setRole(e.target.value)} />

                        <Button type='submit' disabled={actionLoading || !company || !role} className="h-10 px-6 text-sm bg-blue-600 hover:bg-blue-700">
                            {actionLoading ? "Saving..." : "Add"}
                        </Button>
                        
                    </div>
                    
                </form>
            
            </Card>
            
            
            <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Filters
                    </p>

                 <div className='bg-slate-50 border border-slate-200 rounded-lg p-4 flex gap-4'>
                    <Input           
                    type="text"
                    placeholder='Search by Company'
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    style={{ marginBottom: "12px", display: "block" }} />

                    <StatusSelect 
                    className='mt-1'
                    value={statusFilter}
                    onChange={(e)=>setStatusFilter(e.target.value)}
                    style={{marginBottom:"12px"}}
                    >
                        <option value="ALL">All</option>
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="OFFER">Offer</option>
                    </StatusSelect>
                    </div>    
            </div>
           
            
             <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                <p className="text-slate-500">No applications found.</p>
                ) : (
                filteredApplications.map((app) => (
                    <Card
                    key={app._id}
                    className="flex items-center justify-between p-5 "
                    >
                    {editingId === app._id ? (
                        <Form className="flex gap-3 w-full bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <Input
                            className="flex-1"
                            value={editValues.company}
                            onChange={(e) =>
                            setEditValues({
                                ...editValues,
                                company: e.target.value,
                            })
                            }
                        />
                        <Input
                            className="flex-1"
                            value={editValues.role}
                            onChange={(e) =>
                            setEditValues({
                                ...editValues,
                                role: e.target.value,
                            })
                            }
                        />
                        <Button size="sm" onClick={saveEdit}>
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                        >
                            Cancel
                        </Button>
                        </Form>
                    ) : (
                        <>
                        <div>
                            <p className="font-semibold text-slate-800">
                            {app.company} — {app.role}
                            </p>

                            <StatusSelect
                            className="mt-1 "
                            value={app.status}
                            onChange={(e) =>
                                handleStatusChange(app._id, e.target.value)
                            }
                            >
                            <option value="APPLIED">Applied</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="OFFER">Offer</option>
                            <option value="REJECTED">Rejected</option>
                            </StatusSelect>
                        </div>

                        <div className="flex gap-2">
                            <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(app)}
                            >
                            Edit
                            </Button>
                            <Button
                            size="sm"
                            variant="dangerGhost"
                            onClick={() => handleDelete(app._id)}
                            >
                            Delete
                            </Button>
                        </div>
                        </>
                )}
                </Card>
                ))
            )}
      </div>
           
    </div>
    )
}

