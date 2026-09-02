export type BiometricMethod = "face" | "fingerprint";
export type ClockDirection = "in" | "out";

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string | null;
  faceTemplate: number[] | null;
  credentialId: string | null;
  createdAt: number;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  method: BiometricMethod;
  direction: ClockDirection;
  timestamp: number;
  confidence: number;
};

export type AttendanceState = {
  employees: Employee[];
  records: AttendanceRecord[];
};
