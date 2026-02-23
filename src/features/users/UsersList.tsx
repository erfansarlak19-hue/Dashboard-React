import { Alert, Avatar, Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./users-api";
import { grey } from "@mui/material/colors";

export default function UsersList() {
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
		return <Alert severity="error">
      {(error as Error).message}
      </Alert>;
	}

	return (
		<Box display="flex" flexDirection={"column"} gap={2} mt={4}>
			{data?.map((user) => (
				<Card sx={{ bgcolor:grey[100] }} key={user.id}>
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
		</Box>
	);
}
