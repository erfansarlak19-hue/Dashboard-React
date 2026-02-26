import DeleteIcon from "@mui/icons-material/Delete";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getUsers } from "../../features/users/users-api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTask, deleteTask, setFilter, toggleTaskStatus } from "../../store/tasksSlice";

export default function UsersList() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.tasks.items);
	const filter = useAppSelector((state) => state.tasks.filter);

	const [open, setOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [taskTitle, setTaskTitle] = useState("");
	const [search, setSearch] = useState("");

		const { data, isLoading, isError, error } = useQuery({
			queryKey: ["users"],
			queryFn: getUsers,
		});

		const filteredUsers = useMemo(() => {
			if (!data) return [];
			const q = search.trim().toLowerCase();
			if (!q) return data;
			return data.filter((u) => u.name.toLowerCase().includes(q));
		}, [data, search]);

	const handleOpenTasks = (userId: string) => {
		setSelectedUserId(userId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setTaskTitle("");
	};

	const userTasks = selectedUserId
		? tasks
				.filter((t) => t.userId === selectedUserId)
				.filter((t) => (filter === "all" ? true : t.status === filter))
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
		<Box sx={{ mt: 4 }}>
			<TextField
				fullWidth
				label="Search by name"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				sx={{ mb: 3 }}
			/>
			<Grid container spacing={2}>
				{filteredUsers.map((user) => (
					<Grid key={user.id}>
						<Card sx={{ bgcolor: "background.paper" }}>
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
								<Box display="flex" justifyContent="flex-end" mt={2}>
									<Button
										size="small"
										variant="outlined"
										onClick={() => handleOpenTasks(user.id)}
									>
										View Tasks
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>
					Tasks - {selectedUser ? `${selectedUser.name}` : ""}
				</DialogTitle>
				<DialogContent>
					<Box
						display="flex"
						gap={1}
						sx={{ mt: 1, mb: 2 }}
						alignItems="stretch"
					>
						<TextField
							fullWidth
							label="Task title"
							value={taskTitle}
							onChange={(e) => setTaskTitle(e.target.value)}
						/>
						<Button
							variant="contained"
							onClick={handleAddTaskForUser}
							sx={{ minWidth: 90 }}
						>
							Add
						</Button>
					</Box>

					<Box display="flex" gap={1} sx={{ mt: 2 }}>
						<Button
							size="small"
							variant={filter === "all" ? "contained" : "outlined"}
							onClick={() => dispatch(setFilter("all"))}
						>
							All
						</Button>
						<Button
							size="small"
							variant={filter === "pending" ? "contained" : "outlined"}
							onClick={() => dispatch(setFilter("pending"))}
						>
							Pending
						</Button>
						<Button
							size="small"
							variant={filter === "done" ? "contained" : "outlined"}
							onClick={() => dispatch(setFilter("done"))}
						>
							Done
						</Button>
					</Box>

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
										<Box display="flex" alignItems="center" gap={1}>
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
										</Box>
									}
								>
									<ListItemText
										primary={t.title}
										secondary={
											<Chip size="small" label={t.status} sx={{ mt: 0.5 }} />
										}
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
