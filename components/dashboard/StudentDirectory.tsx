"use client"
import { Search, Filter, ChevronDown, Edit3, Trash2 } from "lucide-react"
import { Student } from "@/lib/types"
import { StatusBadge } from "@/components/ui/StatusBadge"

interface Props {
    isLoading: boolean
    filteredStudents: Student[]
    selectedIds: string[]
    setSelectedIds: (ids: string[]) => void
    toggleSelect: (id: string) => void
    handleEdit: (s: Student) => void
    getClassBadgeStyles: (className: string) => string
}

export function StudentDirectory({
    isLoading,
    filteredStudents,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    handleEdit,
    getClassBadgeStyles
}: Props) {
    return (
        <div className="bg-white rounded-[2rem] shadow-enterprise border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 items-center justify-between bg-slate-50/20">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                    <Filter size={14} />
                    Filter Parameters
                    <ChevronDown size={14} />
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2.5 text-[11px] font-black text-slate-600 uppercase tracking-widest">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                        {filteredStudents.filter(s => s.status === 'Active').length} Active
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-black text-slate-600 uppercase tracking-widest text-slate-400">
                        Total: {filteredStudents.length} Records
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-slate-50 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">
                            <th className="px-10 py-6 w-12 text-center border-r border-slate-50">
                                <input
                                    type="checkbox"
                                    className="rounded-lg border-slate-200 text-accent focus:ring-accent w-5 h-5 cursor-pointer accent-accent"
                                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) setSelectedIds(filteredStudents.map(s => s.id))
                                        else setSelectedIds([])
                                    }}
                                />
                            </th>
                            <th className="px-6 py-6">Comprehensive Profile</th>
                            <th className="px-6 py-6">Institutional ID</th>
                            <th className="px-6 py-6">Current Cohort</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {isLoading && filteredStudents.length === 0 ? (
                            <SkeletonRows />
                        ) : filteredStudents.length === 0 ? (
                            <tr><td colSpan={4} className="px-8 py-24 text-center text-slate-400 font-medium italic">No corresponding student data available.</td></tr>
                        ) : (
                            filteredStudents.map((s) => (
                                <tr key={s.id} className="group hover:bg-slate-50/40 transition-all duration-300">
                                    <td className="px-10 py-5 text-center border-r border-slate-50">
                                        <input
                                            type="checkbox"
                                            className="rounded-lg border-slate-200 text-accent focus:ring-accent w-5 h-5 cursor-pointer accent-accent transition-transform group-hover:scale-110"
                                            checked={selectedIds.includes(s.id)}
                                            onChange={() => toggleSelect(s.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-5 group/name relative">
                                            <div className="relative">
                                                <img src={s.avatar} className="w-12 h-12 rounded-2xl object-cover bg-slate-100 shadow-soft" alt="" />
                                                <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${s.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                            </div>
                                            <div className="space-y-0.5 cursor-pointer" onClick={() => handleEdit(s)}>
                                                <p className="font-heading font-black text-slate-900 group-hover/name:text-accent transition-colors tracking-tight flex items-center gap-2">
                                                    {s.name}
                                                    <Edit3 size={14} className="opacity-0 group-hover/name:opacity-100" />
                                                </p>
                                                <p className="text-xs font-bold text-slate-600">{s.email || 'no-email@nexus.edu'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[11px] font-black font-mono text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/50 shadow-inner tracking-widest">{s.student_code}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 ${getClassBadgeStyles(s.class || '')}`}>
                                            {s.class || 'UNLISTED'}
                                        </span>
                                    </td>
                                </tr>
                            )
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SkeletonRows() {
    return Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
            <td className="px-10 py-6 border-r border-slate-50"><div className="w-5 h-5 bg-slate-100 rounded-lg mx-auto" /></td>
            <td className="px-6 py-6 font-medium">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                    <div className="space-y-2.5">
                        <div className="w-40 h-3.5 bg-slate-100 rounded" />
                        <div className="w-28 h-2.5 bg-slate-50 rounded" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-6"><div className="w-24 h-5 bg-slate-50 rounded-lg" /></td>
            <td className="px-6 py-6"><div className="w-28 h-6 bg-slate-50 rounded-xl" /></td>
            <td className="px-6 py-6"><div className="w-20 h-6 bg-slate-50 rounded-2xl" /></td>
        </tr>
    ))
}
