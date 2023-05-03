import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import {
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';

import { theme } from './theme';
import Home from './pages/Home';

const rootRoute = new RootRoute({
	component: () => (
		<>
			<CssBaseline />
			<Container
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
					gap: 2
				}}
			>
				<Outlet />
			</Container>
		</>
	)
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
	<ThemeProvider theme={theme}>
		<RouterProvider router={router} />
	</ThemeProvider>
);

export default App;
