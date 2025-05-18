// src/lib/services/studentService.ts
'use server'; // Marking for potential future use in Server Actions or direct server-side calls

import { studentsData, getStudentById as getMockStudentById } from '@/lib/data';
import type { Student, Guardian, Milestone, ReportItem } from '@/lib/types';
// import { API_ENDPOINTS } from '@/lib/api/endpoints'; // To be used when connecting to a real API

/**
 * Fetches all students.
 * Currently returns mock data.
 */
export const getAllStudents = async (): Promise<Student[]> => {
  // TODO: Replace with actual API call
  // try {
  //   const response = await fetch(API_ENDPOINTS.students);
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch students');
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error('Error fetching students:', error);
  //   return []; // Or throw error
  // }
  return Promise.resolve(studentsData);
};

/**
 * Fetches a single student by their ID.
 * Currently returns mock data.
 * @param id The ID of the student to fetch.
 */
export const getStudentById = async (id: string): Promise<Student | undefined> => {
  // TODO: Replace with actual API call
  // try {
  //   const response = await fetch(API_ENDPOINTS.studentById(id));
  //   if (!response.ok) {
  //     if (response.status === 404) return undefined;
  //     throw new Error(`Failed to fetch student with id ${id}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error(`Error fetching student ${id}:`, error);
  //   return undefined; // Or throw error
  // }
  const student = getMockStudentById(id);
  return Promise.resolve(student);
};

// Example of functions you might add for a real backend:
/*
export const getStudentGuardians = async (studentId: string): Promise<Guardian[]> => {
  // const response = await fetch(`${API_ENDPOINTS.studentById(studentId)}/guardians`);
  // ...
  const student = await getStudentById(studentId);
  return Promise.resolve(student?.guardians || []);
};

export const getStudentMilestones = async (studentId: string): Promise<Milestone[]> => {
  // const response = await fetch(`${API_ENDPOINTS.studentById(studentId)}/milestones`);
  // ...
  const student = await getStudentById(studentId);
  return Promise.resolve(student?.milestones || []);
};

export const getStudentReports = async (studentId: string): Promise<ReportItem[]> => {
    const student = await getStudentById(studentId);
    return Promise.resolve(student?.reports || []);
}
*/
