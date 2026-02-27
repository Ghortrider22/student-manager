"use client"
import { useState, useEffect } from "react"
import { Clock, Plus, Trash2, Edit3, MapPin, User, Tag, AlertCircle } from "lucide-react"
import { ScheduleItem } from "@/lib/types"
import { supabase } from "@/lib/supabase"

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// Updated slots to match the SQL data provided earlier
const TIME_SLOTS = [
    '08:00 - 09:30',
    '10:00 - 11:30',
    '13:30 - 15:00',
    '15:15 - 16:45',
    '17:00 - 18:30',
    '19:00 - 20:30'
]

export function ScheduleView() {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Form State
    const [subject, setSubject] = useState("")
    const [time, setTime] = useState("")
    const [room, setRoom] = useState("")
    const [teacher, setTeacher] = useState("")
    const [type, setType] = useState<'lecture' | 'lab'>('lecture')
    const [day, setDay] = useState("Monday")

    useEffect(() => {
        fetchSchedules()
    }, [])

    async function fetchSchedules() {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('schedules')
            .select('*')

        if (error) {
            console.error("Supabase Error:", error)
        } else {
            console.log("Fetched Schedules:", data)
            setSchedules(data || [])
        }
        setIsLoading(false)
    }

    function openAddModal(selectedDay?: string, selectedTime?: string) {
        setEditingId(null)
        setSubject("")
        setTime(selectedTime || TIME_SLOTS[0])
        setRoom("")
        setTeacher("")
        setType("lecture")
        setDay(selectedDay || "Monday")
        setIsModalOpen(true)
    }

    function openEditModal(item: ScheduleItem) {
        setEditingId(item.id)
        setSubject(item.subject)
        setTime(item.time)
        setRoom(item.room)
        setTeacher(item.teacher)
        setType(item.type)
        setDay(item.day)
        setIsModalOpen(true)
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this schedule entry?")) return
        const { error } = await supabase.from('schedules').delete().eq('id', id)
        if (error) alert(error.message)
        else fetchSchedules()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const payload = { subject, time, room, teacher, type, day }

        if (editingId) {
            const { error } = await supabase.from('schedules').update(payload).eq('id', editingId)
            if (error) alert(error.message)
        } else {
            const { error } = await supabase.from('schedules').insert(payload)
            if (error) alert(error.message)
        }

        setIsLoading(false)
        setIsModalOpen(false)
        fetchSchedules()
    }

    // Find items that don't match any standard slot
    const unmappedSchedules = schedules.filter(s => !TIME_SLOTS.includes(s.time))

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-enterprise border border-slate-100">
                <div>
                    <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Institutional Calendar</h2>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Weekly Academic Protocol</p>
                </div>
                <button
                    onClick={() => openAddModal()}
                    className="bg-accent hover:bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 text-sm"
                >
                    <Plus size={20} />
                    Append Schedule
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-enterprise border border-slate-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-fixed min-w-[1200px]">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="w-32 p-6 border-r border-white/5 text-[10px] uppercase font-black tracking-widest text-slate-400">Time</th>
                                {DAYS.map(day => (
                                    <th key={day} className="p-6 border-r border-white/5 text-xs font-black uppercase tracking-[0.2em]">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TIME_SLOTS.map((slot) => (
                                <tr key={slot} className="border-b border-slate-100 group">
                                    <td className="p-4 text-center border-r border-slate-50 bg-slate-50/50">
                                        <span className="text-[10px] font-black text-slate-500 uppercase leading-none">{slot}</span>
                                    </td>
                                    {DAYS.map(dayName => {
                                        const item = schedules.find(s => s.day === dayName && s.time === slot)
                                        return (
                                            <td key={`${dayName}-${slot}`} className="p-3 border-r border-slate-50 min-h-[140px] relative">
                                                {item ? (
                                                    <div
                                                        onClick={() => openEditModal(item)}
                                                        className={`h-full p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${item.type === 'lecture' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/50 border border-current opacity-60">{item.type}</span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                                className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                        <h4 className="font-heading font-black text-xs leading-tight mb-2 uppercase">{item.subject}</h4>
                                                        <div className="space-y-1">
                                                            <p className="text-[9px] font-bold flex items-center gap-1.5 opacity-70">
                                                                <User size={10} /> {item.teacher}
                                                            </p>
                                                            <p className="text-[9px] font-bold flex items-center gap-1.5 opacity-70">
                                                                <MapPin size={10} /> {item.room}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => openAddModal(dayName, slot)}
                                                        className="w-full h-full min-h-[80px] rounded-2xl border-2 border-dashed border-slate-100 hover:border-accent/30 hover:bg-slate-50 transition-all flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Plus size={20} />
                                                    </button>
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {unmappedSchedules.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 ml-6 text-slate-600 font-black text-xs uppercase tracking-widest">
                        <AlertCircle size={16} className="text-amber-500" />
                        Special Sessions / Unmapped TimeSlots
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unmappedSchedules.map(item => (
                            <div
                                key={item.id}
                                onClick={() => openEditModal(item)}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-enterprise flex items-center gap-6 group cursor-pointer hover:-translate-y-1 transition-all"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white transition-colors">
                                    <Clock size={20} />
                                    <span className="text-[8px] font-black mt-1 uppercase italic">Custom</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-heading font-black text-sm text-slate-900 uppercase">{item.subject}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 mt-1">{item.day} | {item.time}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                    className="p-3 text-slate-300 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-xl animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">
                        <div className="bg-[#020617] p-10 text-white">
                            <h2 className="text-3xl font-heading font-black">{editingId ? "Update Entry" : "New Entry"}</h2>
                            <p className="text-slate-400 text-sm mt-1">Protocol Modification Console</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject Title</label>
                                <input
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-bold text-slate-800"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Time Slot</label>
                                    <select
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-bold text-slate-800 appearance-none"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                    >
                                        <option value="">Select slot</option>
                                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                        {!TIME_SLOTS.includes(time) && time && <option value={time}>{time} (Custom)</option>}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Location / Room</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-bold text-slate-800"
                                        value={room}
                                        onChange={e => setRoom(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Instructor</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-bold text-slate-800"
                                        value={teacher}
                                        onChange={e => setTeacher(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Day of Week</label>
                                    <select
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-bold text-slate-800 appearance-none"
                                        value={day}
                                        onChange={e => setDay(e.target.value)}
                                    >
                                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-slate-600 text-xs uppercase tracking-widest">Discard</button>
                                <button type="submit" disabled={isLoading} className="flex-[2] py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 disabled:opacity-50">
                                    {isLoading ? "Processing..." : "Authorize Change"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
