import { Container, Typography } from "@mui/material"
import UsersList from "./features/users/UsersList"
import Tasks from "./tasks/Tasks";

function App() {
  return (
		<Container>
			<Typography variant="h4" mt={4}>
				User Dashboard
			</Typography>
			<UsersList />
			<Tasks/>
		</Container>
	);
}

export default App
