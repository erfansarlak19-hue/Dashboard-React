export type User = {
	id: string;
	name: string;
	email: string;
	avatar: string;
};

export type TaskStatus = "done" | "pending";

export type Task = {
	id: string;
	title: string;
	status: TaskStatus;
	userId: string;
};
