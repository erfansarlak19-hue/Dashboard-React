import { Container, Typography } from "@mui/material"
import UsersList from "./features/users/UsersList"

function App() {
  return (
		<Container>
			<Typography variant="h4" mt={4}>
				User Dashboard
			</Typography>
			<UsersList />
		</Container>
	);
}

export default App
