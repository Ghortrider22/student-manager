"use client"
import { Users, UserCheck, BookOpen, GraduationCap } from "lucide-react"
import { Student, ClassRecord } from "@/lib/types"

export function OverviewView({ students, classes }: { students: Student[], classes: ClassRecord[] }) {
    const stats = [
        { label: 'Total Enrollment', value: students.length, icon: <Users size={24} />, color: 'bg-blue-600' },
        { label: 'Active Students', value: students.filter(s => s.status === 'Active').length, icon: <UserCheck size={24} />, color: 'bg-emerald-600' },
        { label: 'Course Modules', value: classes.length, icon: <BookOpen size={24} />, color: 'bg-amber-600' },
        { label: 'Graduation Rate', value: '94.2%', icon: <GraduationCap size={24} />, color: 'bg-indigo-600' },
    ]

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-enterprise border border-slate-50 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform ${s.color.replace('bg-', 'text-')}`}>
                            {s.icon}
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-2xl text-white ${s.color} shadow-lg shadow-current/20`}>
                                {s.icon}
                            </div>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.label}</span>
                        </div>
                        <div className="text-3xl font-heading font-black text-slate-900 tracking-tighter">{s.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-enterprise border border-slate-50">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-heading font-black text-slate-900 tracking-tight">Institutional Growth Matrix</h3>
                            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Enrollment analytics 2024-2025</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent" />
                            <div className="w-3 h-3 rounded-full bg-slate-100" />
                        </div>
                    </div>
                    <div className="h-64 flex items-end gap-3 px-2">
                        {[45, 62, 58, 75, 90, 82, 95, 110, 105, 125, 140, 155].map((h, i) => (
                            <div key={i} className="flex-1 space-y-2 group cursor-pointer">
                                <div
                                    className="w-full bg-slate-50 rounded-lg group-hover:bg-accent/10 transition-colors relative flex items-end overflow-hidden"
                                    style={{ height: '100%' }}
                                >
                                    <div
                                        className="w-full bg-accent rounded-lg transition-all duration-1000 group-hover:bg-blue-600"
                                        style={{ height: `${(h / 160) * 100}%` }}
                                    />
                                </div>
                                <div className="text-[9px] font-black text-slate-400 text-center uppercase tracking-tighter">M{i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0F172A] p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-heading font-black mb-8 relative z-10">System Deployment Logs</h3>
                    <div className="space-y-6 relative z-10">
                        {[
                            { time: '09:42 AM', event: 'Registry synchronization complete', status: 'optimal' },
                            { time: '08:15 AM', event: 'New cohort K66-KHMT initialized', status: 'active' },
                            { time: 'Yesterday', event: 'System backup archived to cloud', status: 'secure' },
                            { time: '2 days ago', event: 'Security protocol update v2.4.1', status: 'optimal' },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                <div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{log.time}</p>
                                    <p className="text-sm font-bold text-slate-100 mt-0.5">{log.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
