export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    source: 'Website' | 'Referral' | 'Walk-in' | 'Social Media';
    stage: 'Inquiry' | 'Visited' | 'Applied' | 'Enrolled' | 'Lost';
    interestedCourse: string;
    lastContacted: string;
    notes: string;
    priority: 'High' | 'Medium' | 'Low';
}

export const CRM_STAGES = ['Inquiry', 'Visited', 'Applied', 'Enrolled', 'Lost'] as const;

export const generateMockLeads = (count: number = 20): Lead[] => {
    const sources = ['Website', 'Referral', 'Walk-in', 'Social Media'];
    const courses = ['JEE Main', 'NEET', 'Foundation', 'Boards'];
    const priorities = ['High', 'Medium', 'Low'];

    return Array.from({ length: count }).map((_, i) => ({
        id: `LEAD-${1000 + i}`,
        name: `Lead Candidate ${i + 1}`,
        phone: `98765${Math.floor(Math.random() * 100000)}`,
        email: `lead${i + 1}@example.com`,
        source: sources[Math.floor(Math.random() * sources.length)] as any,
        stage: CRM_STAGES[Math.floor(Math.random() * CRM_STAGES.length)],
        interestedCourse: courses[Math.floor(Math.random() * courses.length)],
        lastContacted: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
        notes: 'Interested in weekend batch.',
        priority: priorities[Math.floor(Math.random() * priorities.length)] as any
    }));
};
