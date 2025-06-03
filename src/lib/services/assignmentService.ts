
// src/lib/services/assignmentService.ts
'use server';

import { sampleAssignments } from '@/lib/data';
import type { Assignment } from '@/lib/types';

/**
 * Fetches all assignments.
 * Currently returns mock data.
 */
export const getAssignments = async (): Promise<Assignment[]> => {
  // In a real app, you'd fetch from a database.
  return Promise.resolve([...sampleAssignments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
};

/**
 * Creates a new assignment.
 * Currently adds to mock data.
 * @param assignmentData Data for the new assignment, excluding 'id' and 'createdAt'.
 */
export const createAssignment = async (
  assignmentData: Omit<Assignment, 'id' | 'createdAt'>
): Promise<Assignment> => {
  const newAssignment: Assignment = {
    ...assignmentData,
    id: `asg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  sampleAssignments.push(newAssignment);
  return Promise.resolve(newAssignment);
};

/**
 * Fetches a single assignment by its ID.
 * Currently returns mock data.
 * @param id The ID of the assignment to fetch.
 */
export const getAssignmentById = async (id: string): Promise<Assignment | undefined> => {
  const assignment = sampleAssignments.find(asg => asg.id === id);
  return Promise.resolve(assignment);
};

// Potential future functions:
// export const updateAssignment = async (id: string, updates: Partial<Assignment>): Promise<Assignment | undefined> => { ... };
// export const deleteAssignment = async (id: string): Promise<boolean> => { ... };
