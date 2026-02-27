import { StudentStatus } from "@/lib/types"

export function StatusBadge({ status, large }: { status: StudentStatus, large?: boolean }) {
    const styles = {
        Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'On Leave': 'bg-amber-50 text-amber-600 border-amber-100',
        Graduated: 'bg-slate-50 text-slate-600 border-slate-200'
    }

    return (
        <span className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 font-black uppercase tracking-[0.15em] ${large ? 'text-[11px] px-5 py-2.5 rounded-3xl' : 'text-[9px]'} ${styles[status]}`}>
            <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-current opacity-50'}`} />
            {status}
        </span>
    )
}
