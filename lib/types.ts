export type StudentStatus = 'Active' | 'On Leave' | 'Graduated'

export type Student = {
    id: string
    name: string
    student_code: string
    email: string
    class: string
    status?: StudentStatus
    phone?: string
    address?: string
    avatar?: string
    created_at?: string
}

export type ClassRecord = {
    id: string
    name: string
    teacher: string
    studentCount: number
    progress: number
    color: string
}

export type ScheduleItem = {
    id: string
    time: string
    subject: string
    room: string
    teacher: string
    type: 'lecture' | 'lab'
    day: string
}
