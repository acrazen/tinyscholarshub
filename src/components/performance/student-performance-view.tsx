import type { Student } from '@/lib/types';
import { AttendanceCard } from './attendance-card';
import { MilestonesCard } from './milestones-card';

interface StudentPerformanceViewProps {
  student: Student;
}

export function StudentPerformanceView({ student }: StudentPerformanceViewProps) {
  return (
    <div className="space-y-6">
      <AttendanceCard student={student} />
      <MilestonesCard milestones={student.milestones} />
    </div>
  );
}
