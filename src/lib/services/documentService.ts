
// src/lib/services/documentService.ts
'use server';

import { studentsData, sampleStudentDocuments } from '@/lib/data';
import type { StudentDocument, Student } from '@/lib/types';

/**
 * Fetches all documents for a specific student.
 * Currently returns mock data.
 * @param studentId The ID of the student.
 */
export const getStudentDocuments = async (studentId: string): Promise<StudentDocument[]> => {
  const student = studentsData.find(s => s.id === studentId);
  return Promise.resolve(student?.studentDocuments || []);
};

/**
 * Adds a new document for a specific student.
 * Currently adds to mock data.
 * @param studentId The ID of the student.
 * @param documentData Data for the new document.
 */
export const addStudentDocument = async (
  studentId: string,
  documentData: Omit<StudentDocument, 'id' | 'uploadDate' | 'studentId' | 'uploadedByUserId'>
): Promise<StudentDocument> => {
  const newDocument: StudentDocument = {
    ...documentData,
    id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    studentId: studentId,
    uploadDate: new Date().toISOString(),
    uploadedByUserId: 'admin-placeholder-id', // In a real app, from authenticated user
  };

  // Add to the global sampleStudentDocuments array
  sampleStudentDocuments.push(newDocument);

  // Also add to the specific student's array in studentsData for immediate reflection in UI
  const studentIndex = studentsData.findIndex(s => s.id === studentId);
  if (studentIndex !== -1) {
    if (!studentsData[studentIndex].studentDocuments) {
      studentsData[studentIndex].studentDocuments = [];
    }
    studentsData[studentIndex].studentDocuments!.push(newDocument);
  }

  return Promise.resolve(newDocument);
};

// Potential future functions:
// export const deleteStudentDocument = async (documentId: string): Promise<boolean> => { ... };
// export const updateStudentDocument = async (documentId: string, updates: Partial<StudentDocument>): Promise<StudentDocument | undefined> => { ... };
