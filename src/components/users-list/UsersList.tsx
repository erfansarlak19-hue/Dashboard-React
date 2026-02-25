import DeleteIcon from "@mui/icons-material/Delete";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUsers } from "../../features/users/users-api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTask, deleteTask, toggleTaskStatus } from "../../store/tasksSlice";

export default function UsersList() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.tasks.items);

	const [open, setOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [taskTitle, setTaskTitle] = useState("");

	const handleOpenTasks = (userId: string) => {
		setSelectedUserId(userId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setTaskTitle("");
	};

	const userTasks = selectedUserId
		? tasks.filter((t) => t.userId === selectedUserId)
		: [];

	const handleAddTaskForUser = () => {
		if (!selectedUserId) return;
		if (!taskTitle.trim()) return;

		dispatch(
			addTask({
				id: Date.now().toString(),
				title: taskTitle.trim(),
				status: "pending",
				userId: selectedUserId,
			}),
		);

		setTaskTitle("");
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return <Alert severity="error">{(error as Error).message}</Alert>;
	}

	const selectedUser = data?.find((u) => u.id === selectedUserId);

	return (
		<Box display="flex" flexDirection={"column"} gap={2} mt={4}>
			{data?.map((user) => (
				<Card
					onClick={() => handleOpenTasks(user.id)}
					sx={{ bgcolor: grey[100], cursor: "pointer" }}
					key={user.id}
				>
					<CardContent>
						<Box display="flex" alignItems="center" gap={2}>
							<Avatar src={user.avatar} />
							<Box>
								<Typography variant="h6">{user.name}</Typography>
								<Typography variant="body2" color="text.secondary">
									{user.email}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			))}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>
					Tasks - {selectedUser ? `${selectedUser.name}` : ""}
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						label="Task title"
						value={taskTitle}
						onChange={(e) => setTaskTitle(e.target.value)}
						sx={{ mt: 1, mb: 2 }}
					/>
					<Button variant="contained" onClick={handleAddTaskForUser}>
						Add Task
					</Button>
					<List sx={{ mt: 2 }}>
						{userTasks.length === 0 ? (
							<Typography variant="body2" color="text.secondary">
								No tasks for this user.
							</Typography>
						) : (
							userTasks.map((t) => (
								<ListItem
									key={t.id}
									secondaryAction={
										<>
											<Button
												size="small"
												onClick={() => dispatch(toggleTaskStatus(t.id))}
											>
												Toggle
											</Button>
											<IconButton
												edge="end"
												onClick={() => dispatch(deleteTask(t.id))}
											>
												<DeleteIcon />
											</IconButton>
										</>
									}
								>
									<ListItemText
										primary={t.title}
										secondary={`status: ${t.status}`}
									/>
								</ListItem>
							))
						)}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
