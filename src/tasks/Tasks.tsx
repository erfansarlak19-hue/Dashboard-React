import { Box, Button, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
	addTask,
	setFilter,
	deleteTask,
	toggleTaskStatus,
} from "../store/tasksSlice";

function Tasks() {
	const dispatch = useAppDispatch();
	const { items, filter } = useAppSelector((state) => state.tasks);

	const filtered =
		filter === "all" ? items : items.filter((t) => t.status === filter);

	return (
		<Container>
			<Typography variant="h5" mt={3}>
				Tasks
			</Typography>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Button
					variant="contained"
					sx={{ mt: 2 }}
					onClick={() =>
						dispatch(
							addTask({
								id: Date.now().toString(),
								title: "New Task",
								status: "pending",
								userId: "1",
							}),
						)
					}
				>
					Add Task
				</Button>
				<Button
					sx={{ mt: 2, border: 1 }}
					onClick={() => dispatch(setFilter("all"))}
				>
					All
				</Button>
				<Button
					sx={{ mt: 2, border: 1 }}
					onClick={() => dispatch(setFilter("pending"))}
				>
					Pending
				</Button>
				<Button
					sx={{ mt: 2, border: 1 }}
					onClick={() => dispatch(setFilter("done"))}
				>
					Done
				</Button>
				<Typography mt={2.5} ml={1} >
					Filter: {filter}
				</Typography>
			</Box>
			{filtered.map((t) => (
				<Box key={t.id} style={{ marginTop: 10 }}>
					<Typography>
						{t.title} ({t.status})
					</Typography>
					<Button size="small" onClick={() => dispatch(toggleTaskStatus(t.id))}>
						Toggle
					</Button>
					<Button
						size="small"
						color="error"
						onClick={() => dispatch(deleteTask(t.id))}
					>
						Delete
					</Button>
				</Box>
			))}
		</Container>
	);
}

export default Tasks;
