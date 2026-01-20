export default function Button({
    children,
    variant="primary",
    size="md",
    className="",
    ...props
}){
    const base = 
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline:"border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400",

        // Add more variants as needed
        ghost:"bg-transparent text-slate-600 hover:bg-slate-100",
        dangerGhost:"bg-transparent text-red-600 hover:bg-red-50"
    }
    const sizes ={
        sm:"px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    }
    
    return(
        <button
         className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}
         >
            {children}
        </button>
    )

}