"use client"

export function IconButton({ icon, badge, onClick }: { icon: any, badge?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-accent hover:border-accent/30 hover:shadow-[0_8px_16px_rgba(59,130,246,0.1)] transition-all active:scale-90"
        >
            {icon}
            {badge && <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-accent rounded-full border-2 border-white shadow-sm"></span>}
        </button>
    )
}

export function TableAction({ icon, color, onClick }: { icon: any, color: 'blue' | 'amber' | 'red', onClick: () => void }) {
    const colors = {
        blue: 'hover:bg-blue-600 bg-blue-50 text-blue-600',
        amber: 'hover:bg-amber-600 bg-amber-50 text-amber-600',
        red: 'hover:bg-red-600 bg-red-50 text-red-600'
    }

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg active:scale-90 ${colors[color]}`}
        >
            {icon}
        </button>
    )
}
