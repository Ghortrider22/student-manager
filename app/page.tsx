"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Plus,
  Search,
  Bell,
  Download,
  ChevronRight,
  Clock,
  Trash2
} from "lucide-react"

// Types
import { Student, ClassRecord, StudentStatus } from "@/lib/types"

// Components
import { Sidebar } from "@/components/dashboard/Sidebar"
import { OverviewView } from "@/components/dashboard/OverviewView"
import { StudentDirectory } from "@/components/dashboard/StudentDirectory"
import { ClassModules } from "@/components/dashboard/ClassModules"
import { ScheduleView } from "@/components/dashboard/ScheduleView"
import { StudentModal } from "@/components/modals/StudentModal"
import { ProfileViewer } from "@/components/modals/ProfileViewer"
import { IconButton } from "@/components/ui/Buttons"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'classes' | 'schedules'>('overview')
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Form State
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [studentCode, setStudentCode] = useState("")
  const [email, setEmail] = useState("")
  const [className, setClassName] = useState("")
  const [status, setStatus] = useState<StudentStatus>('Active')
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")

  // Mock Class Data
  const classes: ClassRecord[] = [
    { id: '1', name: 'K65-CNTT1', teacher: 'ThS. Nguyễn Văn Thắng', studentCount: 45, progress: 65, color: '#ECFDF5' },
    { id: '2', name: 'K65-CNTT2', teacher: 'TS. Lê Thị Mai', studentCount: 42, progress: 40, color: '#F0F9FF' },
    { id: '3', name: 'K66-KHMT', teacher: 'ThS. Trần Hoàng Nam', studentCount: 38, progress: 15, color: '#FFF7ED' },
    { id: '4', name: 'K64-HTTT', teacher: 'PGS. Đặng Minh Tuấn', studentCount: 50, progress: 100, color: '#F5F3FF' },
  ]

  async function fetchStudents() {
    setIsLoading(true)
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })

    const enrichedData = (data || []).map((s: any, idx: number) => ({
      ...s,
      status: s.status || (idx % 10 === 0 ? 'On Leave' : idx % 15 === 0 ? 'Graduated' : 'Active'),
      avatar: `https://i.pravatar.cc/150?u=${s.id}`
    }))

    setStudents(enrichedData)
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !studentCode) return
    setIsLoading(true)

    const payload = {
      name,
      student_code: studentCode,
      email,
      class: className,
      status,
      phone: phoneNumber,
      address
    }

    if (editId) {
      const { error } = await supabase.from("students").update(payload).eq("id", editId)
      if (error) alert(error.message)
    } else {
      const { error } = await supabase.from("students").insert(payload)
      if (error) alert(error.message)
    }

    closeModal()
    fetchStudents()
  }

  async function handleDelete(id: string) {
    if (!confirm("Xác nhận xóa bản ghi sinh viên này?")) return
    const { error } = await supabase.from("students").delete().eq("id", id)
    if (error) alert(error.message)
    fetchStudents()
  }

  async function handleBulkDelete() {
    if (!confirm(`Bạn có chắc muốn xóa ${selectedIds.length} sinh viên đã chọn?`)) return
    setIsLoading(true)
    const { error } = await supabase.from("students").delete().in("id", selectedIds)
    if (error) alert(error.message)
    setSelectedIds([])
    fetchStudents()
    setIsLoading(false)
  }

  function handleEdit(s: Student) {
    setEditId(s.id)
    setName(s.name)
    setStudentCode(s.student_code)
    setEmail(s.email)
    setClassName(s.class || "")
    setStatus(s.status || 'Active')
    setPhoneNumber(s.phone || "")
    setAddress(s.address || "")
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditId(null)
    setName("")
    setStudentCode("")
    setEmail("")
    setClassName("")
    setStatus('Active')
    setPhoneNumber("")
    setAddress("")
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.student_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.class && s.class.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredClasses = classes.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getClassBadgeStyles = (classStr: string) => {
    if (classStr.includes('CNTT')) return 'bg-emerald-50 text-emerald-600 border-emerald-100'
    if (classStr.includes('KHMT')) return 'bg-blue-50 text-blue-600 border-blue-100'
    return 'bg-slate-50 text-slate-500 border-slate-200'
  }

  function handleExportCSV() {
    const headers = ["ID", "Name", "Student Code", "Email", "Class", "Status"]
    const rows = students.map(s => [s.id, s.name, s.student_code, s.email, s.class, s.status])
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n")
    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", `student_report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Export successful.")
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-body">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header - Enterprise Premium Upgrade */}
        <header className="bg-white/70 backdrop-blur-xl h-20 flex items-center justify-between px-10 sticky top-0 z-50 border-b border-slate-200/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
              <span
                onClick={() => setActiveTab('overview')}
                className="text-[10px] font-black text-slate-400 hover:text-accent transition-all cursor-pointer uppercase tracking-widest"
              >
                Hệ Thống
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                {activeTab === 'students' ? 'Học Sinh' : activeTab === 'overview' ? 'Tổng Quan' : 'Lịch Học'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block w-80">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm thông tin..."
                className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl pl-11 pr-12 py-2.5 outline-none focus:ring-4 focus:ring-accent/10 focus:bg-white focus:border-accent/50 transition-all text-[13px] font-bold text-slate-800 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-slate-200 rounded-lg px-1.5 py-1 bg-white shadow-sm pointer-events-none group-focus-within:opacity-0 transition-opacity">
                <span className="text-[9px] font-black text-slate-400 italic">⌘</span>
                <span className="text-[9px] font-black text-slate-400">K</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <IconButton icon={<Bell size={18} />} badge />
                <IconButton icon={<Download size={18} />} onClick={handleExportCSV} />
              </div>

              <div className="h-8 w-[1px] bg-slate-200/60 mx-1" />

              <div className="flex items-center gap-3 group cursor-pointer pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black text-slate-900 leading-none">Vinh Hưng</p>
                  <p className="text-[9px] font-bold text-emerald-600 mt-1 flex items-center justify-end gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Đang online
                  </p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F172A] p-0.5 shadow-lg group-hover:scale-105 transition-transform active:scale-95">
                    <img
                      src="https://ui-avatars.com/api/?name=Vinh+Hung&background=0F172A&color=fff"
                      className="w-full h-full rounded-[14px] object-cover"
                      alt="User"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto custom-scrollbar p-10 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-1.5">
                <h1 className="text-4xl font-heading font-black text-slate-900 tracking-tighter">
                  {activeTab === 'students' ? 'Học Sinh' : activeTab === 'classes' ? 'Academic Classrooms' : activeTab === 'overview' ? 'Institutional Overview' : 'Lịch Học'}
                </h1>
                <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  System status: <span className="text-emerald-600 font-bold">Synchronized</span> (just now)
                </p>
              </div>

              <div className="flex items-center gap-3">
                {selectedIds.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="bg-red-50 text-red-600 border border-red-100 px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all text-sm animate-in slide-in-from-right-4"
                  >
                    <Trash2 size={18} />
                    Delete {selectedIds.length} Selected
                  </button>
                )}
                {activeTab === 'students' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent hover:bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black shadow-2xl shadow-blue-500/40 transition-all active:scale-[0.98] flex items-center gap-3 text-sm"
                  >
                    <Plus size={20} strokeWidth={3} />
                    Enroll New Student
                  </button>
                )}
              </div>
            </div>

            {activeTab === 'overview' && <OverviewView students={students} classes={classes} />}
            {activeTab === 'students' && (
              <StudentDirectory
                isLoading={isLoading}
                filteredStudents={filteredStudents}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                toggleSelect={toggleSelect}
                handleEdit={handleEdit}
                getClassBadgeStyles={getClassBadgeStyles}
              />
            )}
            {activeTab === 'classes' && <ClassModules filteredClasses={filteredClasses} />}
            {activeTab === 'schedules' && <ScheduleView />}
          </div>
        </div>
      </main>

      <StudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editId={editId}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        formState={{
          name, setName,
          studentCode, setStudentCode,
          phoneNumber, setPhoneNumber,
          email, setEmail,
          status, setStatus,
          address, setAddress
        }}
      />

      <ProfileViewer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        student={selectedStudent}
      />
    </div>
  )
}