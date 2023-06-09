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
	RouterProvider,
	useNavigate
} from '@tanstack/react-router';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';
import Home from './pages/Home';
import YourGames from './pages/YourGames';
import PlayQuiz from './pages/PlayQuiz';
import LeaderBoard from './pages/LeaderBoard';
import NotFound from './pages/NotFound';
import ButtonLink from './components/ButtonLink';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import Profile from './pages/Profile';
import { logOutUser } from './utils/logOutUser';
import Quiz from './pages/Quiz';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();
		const navigate = useNavigate();

		return (
			<>
				<CssBaseline />
				<AppBar sx={{ position: 'sticky' }}>
					<Container>
						<Toolbar>
							<ButtonLink to="/">Home</ButtonLink>
							{user && (
								<>
									<ButtonLink to="/play">Play</ButtonLink>
									<ButtonLink to="/yourgames">Your Games</ButtonLink>
									<ButtonLink to="/leaderboard">Leader Board</ButtonLink>

									<Box sx={{ flexGrow: 1 }} />

									<ButtonLink to="/profile">
										<Avatar sx={{ width: 35, height: 35 }} src={user.image} />
									</ButtonLink>
									<Button
										variant="outlined"
										onClick={() => {
											navigate({ to: '/' });
											logOutUser();
										}}
									>
										Logout
										<LogoutRoundedIcon sx={{ ml: 1 }} />
									</Button>
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

const quizRoute = new Route({
	getParentRoute: () => rootRoute,
	path: 'quiz/$playlistId',
	component: Quiz
});

const yourGamesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/yourgames',
	component: YourGames
});

const leadeBoardRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/leaderboard',
	component: LeaderBoard
});

const profileRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: Profile
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	playRoute,
	quizRoute,
	yourGamesRoute,
	leadeBoardRoute,
	profileRoute,
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
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</UserProvider>
);

export default App;
