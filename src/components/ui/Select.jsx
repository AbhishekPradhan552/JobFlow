export default function Select({
    children,
    className = "",
    ...props
}){
    return(
        <select 
        className={`
        border
        border-slate-300
        rounded-lg
        px-3
        py-2
        text-sm
        bg-white
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        ${className}
      `}
      {...props}
      >
        {children}
      </select>
    )
}