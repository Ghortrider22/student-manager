"use client"
import { Users } from "lucide-react"
import { StudentStatus } from "@/lib/types"

interface Props {
    isOpen: boolean
    onClose: () => void
    editId: string | null
    isLoading: boolean
    handleSubmit: (e: React.FormEvent) => void
    handleDelete: (id: string) => void
    formState: {
        name: string
        setName: (v: string) => void
        studentCode: string
        setStudentCode: (v: string) => void
        phoneNumber: string
        setPhoneNumber: (v: string) => void
        email: string
        setEmail: (v: string) => void
        status: StudentStatus
        setStatus: (v: StudentStatus) => void
        address: string
        setAddress: (v: string) => void
    }
}

export function StudentModal({
    isOpen,
    onClose,
    editId,
    isLoading,
    handleSubmit,
    handleDelete,
    formState
}: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-xl animate-in fade-in">
            <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-400">
                <div className="bg-[#020617] p-12 text-slate-50 relative border-b border-white/5">
                    <div className="absolute bottom-[-10%] right-[-10%] p-10 pointer-events-none opacity-10">
                        <Users size={180} strokeWidth={1} />
                    </div>
                    <h2 className="text-4xl font-heading font-black tracking-tighter text-white drop-shadow-md">{editId ? "Update Identity" : "New Candidate"}</h2>
                    <p className="text-slate-300 font-bold text-sm mt-2">Institutional Academic Registry Protocol</p>
                </div>

                <form onSubmit={handleSubmit} className="p-12 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Candidate Identifier</label>
                        <input
                            required
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-black text-slate-800 text-lg shadow-inner"
                            placeholder="e.g. Nguyễn Văn An"
                            value={formState.name}
                            onChange={e => formState.setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">System Serial</label>
                            <input
                                required
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-mono font-black text-slate-800 shadow-inner"
                                placeholder="SV-2024-XXX"
                                value={formState.studentCode}
                                onChange={e => formState.setStudentCode(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Personal Contact</label>
                            <input
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-bold text-slate-700 shadow-inner"
                                placeholder="e.g. 0912 xxx xxx"
                                value={formState.phoneNumber}
                                onChange={e => formState.setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Official Communications</label>
                            <input
                                type="email"
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-bold text-slate-700 shadow-inner"
                                placeholder="student@nexus.edu.vn"
                                value={formState.email}
                                onChange={e => formState.setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Academic Lifecycle</label>
                            <select
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-bold text-slate-700 shadow-inner appearance-none cursor-pointer"
                                value={formState.status}
                                onChange={e => formState.setStatus(e.target.value as StudentStatus)}
                            >
                                <option value="Active">Active Status</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Graduated">Graduated</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Physical Address</label>
                        <input
                            className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-4.5 outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent focus:bg-white transition-all font-bold text-slate-800 shadow-sm"
                            placeholder="e.g. 123 Nguyễn Trãi, Thanh Xuân, Hà Nội"
                            value={formState.address}
                            onChange={e => formState.setAddress(e.target.value)}
                        />
                    </div>

                    <div className="pt-6 flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-3xl font-black transition-all active:scale-95 text-xs uppercase tracking-widest"
                        >
                            Discard
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={() => { handleDelete(editId); onClose(); }}
                                className="px-6 py-5 bg-red-50 hover:bg-red-100 text-red-600 rounded-3xl font-black transition-all active:scale-95 text-xs uppercase tracking-widest border border-red-100"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-5 bg-accent hover:bg-blue-600 text-white rounded-3xl font-black shadow-2xl shadow-blue-500/40 transition-all active:scale-95 text-xs uppercase tracking-[0.15em] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Processing..." : editId ? "Authorize Modification" : "Authorize Final Enrollment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
