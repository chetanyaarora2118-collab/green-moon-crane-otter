import { i as __toESM } from "../_runtime.mjs";
import { s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as newId } from "./utils-BYe7GtRE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-store-BJ_zLtyq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "attendance-tracker/v1";
var emptyState = {
	employees: [],
	records: []
};
var state = emptyState;
var hydrated = false;
var listeners = /* @__PURE__ */ new Set();
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
			const parsed = JSON.parse(raw);
			state = {
				employees: Array.isArray(parsed.employees) ? parsed.employees : [],
				records: Array.isArray(parsed.records) ? parsed.records : []
			};
		}
	} catch {
		state = emptyState;
	}
	emit();
}
function setState(next) {
	state = next;
	persist();
	emit();
}
function isOnSite(records, employeeId) {
	const today = (/* @__PURE__ */ new Date()).toDateString();
	return records.filter((record) => record.employeeId === employeeId && new Date(record.timestamp).toDateString() === today).length % 2 === 1;
}
function useAttendance() {
	const [snapshot, setSnapshot] = (0, import_react.useState)(state);
	(0, import_react.useEffect)(() => {
		const listener = () => setSnapshot({ ...state });
		listeners.add(listener);
		hydrate();
		listener();
		return () => {
			listeners.delete(listener);
		};
	}, []);
	const addEmployee = (0, import_react.useCallback)((input) => {
		const employee = {
			...input,
			id: newId(),
			createdAt: Date.now()
		};
		setState({
			...state,
			employees: [...state.employees, employee]
		});
		return employee;
	}, []);
	const updateEmployee = (0, import_react.useCallback)((id, patch) => {
		setState({
			...state,
			employees: state.employees.map((employee) => employee.id === id ? {
				...employee,
				...patch
			} : employee)
		});
	}, []);
	const removeEmployee = (0, import_react.useCallback)((id) => {
		setState({
			employees: state.employees.filter((employee) => employee.id !== id),
			records: state.records.filter((record) => record.employeeId !== id)
		});
	}, []);
	const logAttendance = (0, import_react.useCallback)((employee, method, confidence) => {
		const today = (/* @__PURE__ */ new Date()).toDateString();
		const punchesToday = state.records.filter((record) => record.employeeId === employee.id && new Date(record.timestamp).toDateString() === today).length;
		const record = {
			id: newId(),
			employeeId: employee.id,
			employeeName: employee.name,
			method,
			direction: punchesToday % 2 === 0 ? "in" : "out",
			timestamp: Date.now(),
			confidence
		};
		setState({
			...state,
			records: [record, ...state.records]
		});
		return record;
	}, []);
	const clearRecords = (0, import_react.useCallback)(() => {
		setState({
			...state,
			records: []
		});
	}, []);
	return {
		...snapshot,
		addEmployee,
		updateEmployee,
		removeEmployee,
		logAttendance,
		clearRecords
	};
}
//#endregion
export { useAttendance as n, isOnSite as t };
