import { useCallback, useEffect, useState } from "react";
import type { AttendanceRecord, AttendanceState, BiometricMethod, Employee } from "@/lib/types";
import { newId } from "@/lib/utils";

const STORAGE_KEY = "attendance-tracker/v1";

const emptyState: AttendanceState = { employees: [], records: [] };

let state: AttendanceState = emptyState;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AttendanceState>;
      state = {
        employees: Array.isArray(parsed.employees) ? parsed.employees : [],
        records: Array.isArray(parsed.records) ? parsed.records : [],
      };
    }
  } catch {
    state = emptyState;
  }
  emit();
}

function setState(next: AttendanceState) {
  state = next;
  persist();
  emit();
}

export function isOnSite(records: AttendanceRecord[], employeeId: string) {
  const today = new Date().toDateString();
  return (
    records.filter(
      (record) => record.employeeId === employeeId && new Date(record.timestamp).toDateString() === today,
    ).length %
      2 ===
    1
  );
}

export function useAttendance() {
  const [snapshot, setSnapshot] = useState(state);

  useEffect(() => {
    const listener = () => setSnapshot({ ...state });
    listeners.add(listener);
    hydrate();
    listener();
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addEmployee = useCallback((input: Omit<Employee, "id" | "createdAt">) => {
    const employee: Employee = { ...input, id: newId(), createdAt: Date.now() };
    setState({ ...state, employees: [...state.employees, employee] });
    return employee;
  }, []);

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    setState({
      ...state,
      employees: state.employees.map((employee) => (employee.id === id ? { ...employee, ...patch } : employee)),
    });
  }, []);

  const removeEmployee = useCallback((id: string) => {
    setState({
      employees: state.employees.filter((employee) => employee.id !== id),
      records: state.records.filter((record) => record.employeeId !== id),
    });
  }, []);

  const logAttendance = useCallback((employee: Employee, method: BiometricMethod, confidence: number) => {
    const today = new Date().toDateString();
    const punchesToday = state.records.filter(
      (record) => record.employeeId === employee.id && new Date(record.timestamp).toDateString() === today,
    ).length;
    const record: AttendanceRecord = {
      id: newId(),
      employeeId: employee.id,
      employeeName: employee.name,
      method,
      direction: punchesToday % 2 === 0 ? "in" : "out",
      timestamp: Date.now(),
      confidence,
    };
    setState({ ...state, records: [record, ...state.records] });
    return record;
  }, []);

  const clearRecords = useCallback(() => {
    setState({ ...state, records: [] });
  }, []);

  return {
    ...snapshot,
    addEmployee,
    updateEmployee,
    removeEmployee,
    logAttendance,
    clearRecords,
  };
}
