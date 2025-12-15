export interface UserProfile {
    email: string;
    name?: string;
    picture?: string | null;
    phone?: string;
    location?: string;
    grade?: string;
    targetScore?: string;
    preferredColleges?: string[];
    applicationCount?: number;
    // Academic details
    schoolName?: string;
    board?: string;
    yearOfPassing?: string;
    percentage?: string;
    physicsMarks?: string;
    chemistryMarks?: string;
    mathsMarks?: string;
    // Personal details
    dateOfBirth?: string;
    gender?: string;
    category?: string;
    address?: string;
    fatherName?: string;
    motherName?: string;
    parentPhone?: string;
    // Institute details
    instituteId?: string;
    instituteName?: string;
}

export const calculateProfileCompletion = (user: UserProfile): number => {
    const fields = [
        'name',
        'phone',
        'grade',
        'targetScore',
        'schoolName',
        'board',
        'yearOfPassing',
        'percentage',
        'dateOfBirth',
        'gender',
        'address',
        'fatherName',
        'motherName',
        'parentPhone'
    ];

    const completedFields = fields.filter(field => {
        const value = user[field as keyof UserProfile];
        return value && value.toString().trim() !== '';
    });

    // Basic info (email) is always present, so we start with some base
    // But let's just calculate based on these extended fields for "gamification"
    // Total fields = 14. Let's make it simpler.

    const totalFields = fields.length;
    const progress = Math.round((completedFields.length / totalFields) * 100);

    return Math.min(100, Math.max(0, progress));
};

export const getMissingFields = (user: UserProfile): string[] => {
    const requiredFields: { key: keyof UserProfile; label: string }[] = [
        { key: 'phone', label: 'Phone Number' },
        { key: 'grade', label: 'Current Grade' },
        { key: 'schoolName', label: 'School Name' },
        { key: 'targetScore', label: 'Target Score' },
        { key: 'address', label: 'Address' }
    ];

    return requiredFields
        .filter(field => !user[field.key])
        .map(field => field.label);
};
