"use client"
import { Plus, Calendar, CheckCircle2 } from "lucide-react"
import { Student } from "@/lib/types"
import { StatusBadge } from "@/components/ui/StatusBadge"

interface Props {
    isOpen: boolean
    onClose: () => void
    student: Student | null
}

export function ProfileViewer({ isOpen, onClose, student }: Props) {
    if (!isOpen || !student) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
                <div className="relative h-48 bg-[#3B82F6] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 opacity-95" />
                    <div className="absolute right-[-10%] top-[-20%] w-72 h-72 bg-white/10 rounded-full blur-[80px]" />
                    <div className="absolute left-[20%] bottom-[-40%] w-48 h-48 bg-blue-400/20 rounded-full blur-[40px]" />
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-xl border border-white/20 active:scale-90"
                    >
                        <Plus size={24} className="rotate-45" />
                    </button>
                </div>
                <div className="px-12 pb-12 relative">
                    <div className="absolute -top-20 left-12">
                        <div className="p-1.5 bg-white rounded-[2.5rem] shadow-2xl">
                            <img src={student.avatar} className="w-36 h-36 rounded-[2.2rem] object-cover bg-slate-50" alt="" />
                        </div>
                    </div>
                    <div className="pt-24 space-y-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-4xl font-heading font-black text-slate-900 tracking-tight">{student.name}</h2>
                                <div className="flex items-center gap-3 mt-2 text-slate-600 font-black text-xs uppercase tracking-widest">
                                    <span className="text-accent">{student.student_code}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <span>Premium Scholar Tier</span>
                                </div>
                            </div>
                            <StatusBadge status={student.status || 'Active'} large />
                        </div>

                        <div className="grid grid-cols-2 gap-8 pb-10 border-b border-slate-100">
                            <ProfileInsight label="Verified Academic Email" value={student.email} />
                            <ProfileInsight label="Primary Enrollment Cohort" value={student.class} />
                            <ProfileInsight label="Institutional Serial" value={student.student_code} />
                            <ProfileInsight label="Academic Lifecycle" value={student.status || 'Active'} />
                            <ProfileInsight label="Initial Registry Date" value={"September 12, 2023"} icon={<Calendar size={16} className="text-slate-600" />} />
                            <ProfileInsight label="Engagement Metrics" value={"96% Average Attendance"} icon={<CheckCircle2 size={16} className="text-emerald-600" />} />
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-5 bg-slate-50 hover:bg-slate-100 rounded-3xl font-black text-slate-600 transition-all text-sm tracking-tight active:scale-95">Archived Records</button>
                            <button className="flex-[1.5] py-5 bg-accent text-white rounded-3xl font-black shadow-2xl shadow-blue-600/30 transition-all text-sm tracking-tight hover:shadow-blue-600/40 active:scale-95">Modify Profile Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileInsight({ label, value, icon }: { label: string, value: string, icon?: any }) {
    return (
        <div className="space-y-1.5 px-4 py-3 bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{label}</p>
            <p className="text-slate-800 font-bold text-[13px] flex items-center gap-2.5">
                {icon}
                {value}
            </p>
        </div>
    )
}
