"use client"
import {
    GraduationCap,
    LayoutDashboard,
    Users,
    BookOpen,
    Calendar,
    UserCheck,
    Settings,
    ChevronDown,
    Clock
} from "lucide-react"

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: any) => void }) {
    return (
        <aside className="hidden lg:flex flex-col w-[280px] glass-sidebar text-white py-8 px-6 shrink-0 z-20">
            <div
                onClick={() => setActiveTab('overview')}
                className="flex items-center gap-3 mb-10 px-2 group cursor-pointer active:scale-95 transition-transform"
            >
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-heading font-black tracking-tight text-white group-hover:text-accent transition-colors">Nexus Analytics</span>
            </div>

            <nav className="flex-1 space-y-1.5 custom-scrollbar overflow-y-auto pr-2">
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    label="Overview"
                    active={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                />
                <SidebarItem
                    icon={<Users size={20} />}
                    label="Students"
                    active={activeTab === 'students'}
                    onClick={() => setActiveTab('students')}
                />
                <SidebarItem
                    icon={<Clock size={20} />}
                    label="Schedules"
                    active={activeTab === 'schedules'}
                    onClick={() => setActiveTab('schedules')}
                />
            </nav>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-accent">VH</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">Vinh Hưng</p>
                        <p className="text-[10px] text-slate-300 font-medium">Head of Admissions</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

function SidebarItem({ icon, label, active, onClick, hasSubmenu, onSubmenuClick }: {
    icon: any,
    label: string,
    active?: boolean,
    onClick?: () => void,
    hasSubmenu?: boolean,
    onSubmenuClick?: (label: string) => void
}) {
    return (
        <div className="space-y-1">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-500 group relative overflow-hidden ${active ? 'bg-white/15 text-white shadow-xl border border-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
                {active && <div className="absolute left-0 top-0 w-1.5 h-full bg-accent shadow-[0_0_20px_rgba(59,130,246,1)]" />}
                <div className="flex items-center gap-4 relative z-10">
                    <span className={`${active ? 'text-accent' : 'group-hover:text-accent'} transition-colors duration-300 font-bold`}>{icon}</span>
                    <span className={`text-[13px] tracking-tight font-black uppercase ${active ? 'text-white' : 'group-hover:text-white text-slate-300'}`}>{label}</span>
                </div>
                {hasSubmenu && <ChevronDown size={14} className={`${active ? 'text-accent' : 'text-slate-500'} group-hover:text-accent transition-all ${active ? 'rotate-180' : ''}`} />}
            </button>
            {active && hasSubmenu && (
                <div className="ml-14 space-y-4 pt-3 pb-6 border-l-2 border-white/5 pl-5 animate-in slide-in-from-top-4 duration-500">
                    <SubItem label="Daily Schedule" onClick={() => onSubmenuClick?.('Daily Schedule')} />
                </div>
            )}
        </div>
    )
}

function SubItem({ label, onClick }: { label: string, onClick?: () => void }) {
    return (
        <div
            onClick={onClick ? onClick : () => alert(`Navigation to ${label} protocol initialized.`)}
            className="text-[11px] font-black text-slate-400 hover:text-accent cursor-pointer transition-all duration-300 uppercase tracking-widest flex items-center gap-2"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            {label}
        </div>
    )
}
