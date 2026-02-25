import { Container, Typography } from "@mui/material";
import Tasks from "../../components/tasks/Tasks";
import UsersList from "../../components/users-list/UsersList";

export default function Dashboard() {
	return (
		<Container>
			<Typography variant="h4" mt={4}>
				User Dashboard
			</Typography>
			<UsersList />
			<Tasks />
		</Container>
	);
}
