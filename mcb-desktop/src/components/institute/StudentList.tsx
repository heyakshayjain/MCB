import React, { useState } from 'react';
import { Student } from '../../utils/instituteUtils';
import { calculateProfileCompletion } from '../../utils/profileUtils';

interface StudentListProps {
    students: Student[];
    onAssignExam?: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAssignExam }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('All');
    const [filterBatch, setFilterBatch] = useState('All');

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = filterGrade === 'All' || student.grade === filterGrade;
        const matchesBatch = filterBatch === 'All' || student.batch === filterBatch;
        return matchesSearch && matchesGrade && matchesBatch;
    });

    const uniqueBatches = Array.from(new Set(students.map(s => s.batch).filter(Boolean)));

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header & Filters */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-900">Student Directory</h3>
                <div className="flex gap-4 flex-wrap">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 w-64"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Grades</option>
                        <option value="12th Grade">12th Grade</option>
                        <option value="11th Grade">11th Grade</option>
                    </select>
                    <select
                        value={filterBatch}
                        onChange={(e) => setFilterBatch(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Batches</option>
                        {uniqueBatches.map(batch => (
                            <option key={batch} value={batch}>{batch}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredStudents.map((student) => {
                            const completion = calculateProfileCompletion(student);
                            return (
                                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                {student.name ? student.name.charAt(0) : student.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{student.name || 'Unknown'}</div>
                                                <div className="text-xs text-gray-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg bg-purple-50 text-purple-700">
                                            {student.batch || 'Unassigned'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-1 w-24 bg-gray-100 rounded-full h-1.5 mr-2">
                                                <div
                                                    className={`h-1.5 rounded-full ${completion === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${completion}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{completion}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {student.targetScore || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onAssignExam && onAssignExam(student.id)}
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Assign Exam
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Mock) */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Showing 1 to {filteredStudents.length} of {filteredStudents.length} results</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
