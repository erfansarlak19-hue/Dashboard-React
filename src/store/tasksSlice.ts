import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {  type Task, type TaskStatus } from "./../types/index";

type FilterType = "all" | TaskStatus;

type TasksState = {
	items: Task[];
	filter: FilterType;
};

const initialState: TasksState = {
	items: [],
	filter: "all",
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.items.push(action.payload);
		},

		deleteTask: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((t) => t.id !== action.payload);
		},

		toggleTaskStatus: (state, action: PayloadAction<string>) => {
			const task = state.items.find((t) => t.id === action.payload);
			if (!task) return;
			task.status = task.status === "done" ? "pending" : "done";
		},

		setFilter: (state, action: PayloadAction<FilterType>) => {
			state.filter = action.payload;
		},
	},
});

export const { addTask, deleteTask, toggleTaskStatus, setFilter } =
	tasksSlice.actions;

export default tasksSlice.reducer;