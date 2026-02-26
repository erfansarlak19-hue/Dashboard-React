import { Box, Container, FormControlLabel, Switch, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import UsersList from "../../components/users-list/UsersList";

export default function Dashboard() {
	const [mode, setMode] = useState<"light" | "dark">("light");

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mt={4}
				>
					<Typography variant="h4" mt={4}>
						User Dashboard
					</Typography>
					<FormControlLabel
						control={
							<Switch
								checked={mode === "dark"}
								onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
							/>
						}
						label={mode === "dark" ? "Dark" : "Light"}
					/>
				</Box>
				<UsersList />
			</Container>
		</ThemeProvider>
	);
}
