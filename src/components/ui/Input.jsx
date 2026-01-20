export default function Input({
    className="",
    ...props

}){
    const base=
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" +
    "text-slate-900 placeholder-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" +
    "disabled:bg-slate-100 disabled:cursor-not-allowed"

    return (
        <input 
        className={`${base} ${className}` } 
        {...props}
        />
    )
}