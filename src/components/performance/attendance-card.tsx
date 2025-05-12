import type { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, PieChart as PieChartIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface AttendanceCardProps {
  student: Student;
}

export function AttendanceCard({ student }: AttendanceCardProps) {
  const { present, absent, totalDays } = student.attendanceSummary;
  const attendancePercentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
          Attendance Summary
        </CardTitle>
        <CardDescription>Overall attendance for the current term.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Attendance Rate</span>
            <span className="text-sm font-semibold text-primary">{attendancePercentage}%</span>
          </div>
          <Progress value={attendancePercentage} aria-label={`${attendancePercentage}% attendance`} className="h-3" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-md">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-semibold">{present} Days</p>
              <p className="text-muted-foreground">Present</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-destructive/10 rounded-md">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-semibold">{absent} Days</p>
              <p className="text-muted-foreground">Absent</p>
            </div>
          </div>
        </div>
         <p className="text-xs text-muted-foreground text-center">Total Days Tracked: {totalDays}</p>
      </CardContent>
    </Card>
  );
}
