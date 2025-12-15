import { UserProfile } from './profileUtils';

export interface Student extends UserProfile {
    id: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    batch?: string;
    applications: {
        id: string;
        collegeName: string;
        status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
        submittedAt?: string;
    }[];
    exams?: {
        id: string;
        name: string;
        status: 'Assigned' | 'Pending' | 'Completed';
        assignedAt: string;
        score?: string;
    }[];
}

export interface Exam {
    id: string;
    name: string;
    duration: string;
    totalMarks: number;
}

export const MOCK_EXAMS: Exam[] = [
    { id: 'EX-001', name: 'JEE Main Mock Test 1', duration: '3 hours', totalMarks: 300 },
    { id: 'EX-002', name: 'JEE Advanced Practice', duration: '6 hours', totalMarks: 360 },
    { id: 'EX-003', name: 'Physics Chapter 1-5', duration: '1.5 hours', totalMarks: 100 },
    { id: 'EX-004', name: 'Chemistry Full Syllabus', duration: '3 hours', totalMarks: 300 },
    { id: 'EX-005', name: 'BITSANT Mock 1', duration: '3 hours', totalMarks: 450 },
    { id: 'EX-006', name: 'VITEEE Practice', duration: '2.5 hours', totalMarks: 125 },
];

export interface InstituteStats {
    totalStudents: number;
    activeApplications: number;
    documentsVerified: number;
    avgProfileCompletion: number;
    topTargetColleges: { name: string; count: number }[];
    applicationStatusDistribution: { status: string; count: number }[];
}

export interface ReportData {
    examName: string;
    avgScore: number;
    highestScore: number;
    date: string;
}

// Generate realistic mock students
export const generateMockStudents = (count: number = 50): Student[] => {
    const students: Student[] = [];
    const colleges = ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT', 'Manipal', 'SRM'];
    const statuses = ['Draft', 'Submitted', 'Under Review', 'Accepted', 'Rejected'];
    const batches = ['Batch A (Morning)', 'Batch B (Evening)', 'Batch C (Weekend)'];

    for (let i = 0; i < count; i++) {
        const hasPhone = Math.random() > 0.2;
        const hasGrade = Math.random() > 0.1;

        students.push({
            id: `STU-${1000 + i}`,
            email: `student${i + 1}@example.com`,
            name: `Student ${i + 1}`,
            phone: hasPhone ? `98765${Math.floor(Math.random() * 100000)}` : undefined,
            grade: hasGrade ? '12th Grade' : undefined,
            targetScore: Math.random() > 0.5 ? '1500+' : '1400+',
            preferredColleges: [colleges[Math.floor(Math.random() * colleges.length)]],
            applicationCount: Math.floor(Math.random() * 10),
            status: Math.random() > 0.1 ? 'Active' : 'Inactive',
            lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
            batch: batches[Math.floor(Math.random() * batches.length)],
            applications: Array.from({ length: Math.floor(Math.random() * 5) }).map((_, j) => ({
                id: `APP-${i}-${j}`,
                collegeName: colleges[Math.floor(Math.random() * colleges.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)] as any,
                submittedAt: new Date().toISOString()
            })),
            exams: Math.random() > 0.7 ? [
                {
                    id: 'EX-001',
                    name: 'JEE Main Mock Test 1',
                    status: Math.random() > 0.5 ? 'Completed' : 'Pending',
                    assignedAt: new Date().toISOString(),
                    score: Math.random() > 0.5 ? '240/300' : undefined
                }
            ] : []
        });
    }
    return students;
};

export const calculateInstituteStats = (students: Student[]): InstituteStats => {
    const totalStudents = students.length;
    const activeApplications = students.reduce((sum, stu) => sum + stu.applications.filter(a => a.status !== 'Draft').length, 0);
    const documentsVerified = Math.floor(totalStudents * 0.6); // Mock metric

    // Calculate average profile completion (simplified)
    const avgProfileCompletion = Math.floor(students.reduce((sum, stu) => {
        let completed = 0;
        if (stu.name) completed++;
        if (stu.phone) completed++;
        if (stu.grade) completed++;
        return sum + (completed / 3) * 100;
    }, 0) / totalStudents);

    // Top Colleges
    const collegeCounts: Record<string, number> = {};
    students.forEach(stu => {
        stu.preferredColleges?.forEach(col => {
            collegeCounts[col] = (collegeCounts[col] || 0) + 1;
        });
    });
    const topTargetColleges = Object.entries(collegeCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Status Distribution
    const statusCounts: Record<string, number> = {};
    students.forEach(stu => {
        stu.applications.forEach(app => {
            statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
        });
    });
    const applicationStatusDistribution = Object.entries(statusCounts)
        .map(([status, count]) => ({ status, count }));

    return {
        totalStudents,
        activeApplications,
        documentsVerified,
        avgProfileCompletion,
        topTargetColleges,
        applicationStatusDistribution
    };
};

export const generateMockReports = (): ReportData[] => {
    return [
        { examName: 'JEE Mock 1', avgScore: 180, highestScore: 280, date: '2024-01-15' },
        { examName: 'JEE Mock 2', avgScore: 195, highestScore: 290, date: '2024-02-01' },
        { examName: 'Physics Unit 1', avgScore: 65, highestScore: 95, date: '2024-02-10' },
        { examName: 'Chem Unit 1', avgScore: 70, highestScore: 98, date: '2024-02-15' },
        { examName: 'JEE Mock 3', avgScore: 210, highestScore: 295, date: '2024-03-01' },
    ];
};

// --- New Features Mock Data ---

export interface Insight {
    id: string;
    type: 'risk' | 'opportunity' | 'trend';
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    affectedStudents: number;
    metric?: string;
}

export const generateMockInsights = (): Insight[] => [
    {
        id: 'INS-1',
        type: 'risk',
        title: 'Physics Performance Drop',
        description: 'Average scores in Physics have dropped by 15% in the last 2 mock tests for Batch A.',
        severity: 'high',
        affectedStudents: 12,
        metric: '-15%'
    },
    {
        id: 'INS-2',
        type: 'opportunity',
        title: 'High Potential in Chemistry',
        description: '5 students consistently scoring above 90% in Chemistry. Recommend advanced assignments.',
        severity: 'medium',
        affectedStudents: 5,
        metric: '90%+'
    },
    {
        id: 'INS-3',
        type: 'trend',
        title: 'Application Submission Rate',
        description: 'Application submissions have increased by 20% this week as deadlines approach.',
        severity: 'low',
        affectedStudents: 45,
        metric: '+20%'
    },
    {
        id: 'INS-4',
        type: 'risk',
        title: 'Low Attendance Warning',
        description: '8 students have missed more than 3 consecutive classes this week.',
        severity: 'high',
        affectedStudents: 8
    }
];

export interface Message {
    id: string;
    subject: string;
    content: string;
    sender: string;
    recipients: string; // 'All Students', 'Batch A', etc.
    sentAt: string;
    type: 'announcement' | 'alert' | 'reminder';
}

export const generateMockMessages = (): Message[] => [
    {
        id: 'MSG-1',
        subject: 'JEE Main Admit Card Released',
        content: 'The admit cards for JEE Main Session 1 are now available. Please download them from the official website.',
        sender: 'Admin',
        recipients: 'All Students',
        sentAt: new Date(Date.now() - 86400000).toISOString(),
        type: 'alert'
    },
    {
        id: 'MSG-2',
        subject: 'Physics Extra Class',
        content: 'There will be an extra class for Physics doubt clearing tomorrow at 4 PM.',
        sender: 'Physics Faculty',
        recipients: 'Batch A (Morning)',
        sentAt: new Date(Date.now() - 172800000).toISOString(),
        type: 'announcement'
    },
    {
        id: 'MSG-3',
        subject: 'Mock Test 3 Schedule',
        content: 'Mock Test 3 is scheduled for this Sunday. Syllabus: Full Physics and Chemistry.',
        sender: 'Exam Cell',
        recipients: 'All Students',
        sentAt: new Date(Date.now() - 259200000).toISOString(),
        type: 'reminder'
    }
];

export interface Resource {
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'link';
    subject: string;
    uploadedBy: string;
    uploadedAt: string;
    size?: string;
    downloads: number;
}

export const generateMockResources = (): Resource[] => [
    {
        id: 'RES-1',
        name: 'Physics Chapter 1 - Notes',
        type: 'pdf',
        subject: 'Physics',
        uploadedBy: 'Physics Faculty',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        size: '2.4 MB',
        downloads: 45
    },
    {
        id: 'RES-2',
        name: 'Chemistry Formula Sheet',
        type: 'pdf',
        subject: 'Chemistry',
        uploadedBy: 'Chemistry Faculty',
        uploadedAt: new Date(Date.now() - 172800000).toISOString(),
        size: '1.1 MB',
        downloads: 89
    },
    {
        id: 'RES-3',
        name: 'Calculus Video Lecture 5',
        type: 'video',
        subject: 'Mathematics',
        uploadedBy: 'Math Faculty',
        uploadedAt: new Date(Date.now() - 259200000).toISOString(),
        size: '150 MB',
        downloads: 32
    },
    {
        id: 'RES-4',
        name: 'JEE Previous Year Papers',
        type: 'link',
        subject: 'General',
        uploadedBy: 'Admin',
        uploadedAt: new Date(Date.now() - 345600000).toISOString(),
        downloads: 120
    }
];
