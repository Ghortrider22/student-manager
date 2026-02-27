"use client"
import { BookOpen, MoreVertical } from "lucide-react"
import { ClassRecord } from "@/lib/types"

export function ClassModules({ filteredClasses }: { filteredClasses: ClassRecord[] }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {filteredClasses.length === 0 ? (
                <div className="col-span-full py-24 text-center text-slate-400 font-medium italic">No corresponding class modules found.</div>
            ) : (
                filteredClasses.map((cls) => (
                    <ClassCard key={cls.id} cls={cls} />
                ))
            )}
        </div>
    )
}

function ClassCard({ cls }: { cls: ClassRecord }) {
    return (
        <div
            onClick={() => alert(`Accessing ${cls.name} management console...`)}
            className="bg-white p-10 rounded-[3rem] shadow-enterprise border border-slate-50/50 group hover:-translate-y-3 transition-all duration-700 relative overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-accent/5 transition-colors" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`p-5 rounded-3xl shadow-sm border border-white/50 backdrop-blur-sm`} style={{ backgroundColor: cls.color }}>
                    <BookOpen className="text-slate-700" size={28} />
                </div>
                <button className="text-slate-200 hover:text-slate-400 transition-colors">
                    <MoreVertical size={24} />
                </button>
            </div>

            <div className="space-y-2 mb-10 relative z-10">
                <h3 className="text-2xl font-heading font-black text-slate-900 leading-tight group-hover:text-accent transition-colors">{cls.name}</h3>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{cls.teacher}</p>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                    <div className="flex -space-x-3.5">
                        {[1, 2, 3, 4].map(idx => (
                            <img key={idx} src={`https://i.pravatar.cc/120?img=${idx + 10 + parseInt(cls.id)}`} className="w-9 h-9 rounded-2xl border-4 border-white object-cover shadow-sm bg-slate-100" />
                        ))}
                        <div className="w-9 h-9 rounded-2xl bg-slate-50 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">+{cls.studentCount - 4}</div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cohort Load</span>
                        <span className="text-[11px] font-black text-slate-800">{cls.studentCount} Participants</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Semester Completion</span>
                        <span className="text-accent">{cls.progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                        <div
                            className="h-full bg-accent rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1)"
                            style={{ width: `${cls.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
