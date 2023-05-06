import { ThemeProvider } from '@emotion/react';
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Toolbar
} from '@mui/material';
import {
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';
import Home from './pages/Home';
import YourMatches from './pages/YourMatches';
import PlayQuiz from './pages/PlayQuiz';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ButtonLink from './components/ButtonLink';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import { signOut } from './firebase';
import { SpotifyAccessProvider } from './hooks/useSpotifyAuth';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();
		return (
			<>
				<CssBaseline />
				<AppBar sx={{ position: 'sticky' }}>
					<Container>
						<Toolbar>
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink to="/play">Play</ButtonLink>
							<ButtonLink to="/yourmatches">Your Matches</ButtonLink>
							<ButtonLink to="/leaderboard">Leader Board</ButtonLink>
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<ButtonLink to="/login">LogIn</ButtonLink>
							) : (
								<>
									<Avatar sx={{ width: 30, height: 30 }} src="taylor.jpg" />
									<Button onClick={signOut}>LogOut</Button>
								</>
							)}
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flexGrow: 1,
						p: 5,
						gap: 4
					}}
				>
					<Outlet />
				</Container>
			</>
		);
	}
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const playRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/play',
	component: PlayQuiz
});

const yourMatchesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/yourmatches',
	component: YourMatches
});

const leadeBoardRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/leaderboard',
	component: LeaderBoard
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	playRoute,
	yourMatchesRoute,
	leadeBoardRoute,
	loginRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

const App = () => (
	<UserProvider>
		<SpotifyAccessProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</SpotifyAccessProvider>
	</UserProvider>
);

export default App;
