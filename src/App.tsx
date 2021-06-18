// prettier-ignore
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Router } from "react-router-dom";
import { RouterSwitch } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import { Drawer } from "./components/Drawer";
import { Snackbar } from './components/Snackbar';
import { useCloseDrawer, useOpenDrawer } from "./controller/drawerController";
import { history } from "./history";
import { router } from "./Router";
import { drawerState } from "./state/drawerState";
import { withRoot } from "./withRoot";

function App() {
	const classes = useStyles();
	const drawerOpen: boolean = useRecoilValue(drawerState)
	const closeDrawer = useCloseDrawer()
	const openDrawer = useOpenDrawer()
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	const handleDrawerToggle = () => {
		if (drawerOpen) {
			closeDrawer()
		} else {
			openDrawer()
		}
	};


	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
				<Snackbar />
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								noWrap={isMobile}
							>
								Create-React-App with Material-UI, Typescript,
								Recoil and Routing
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer />
					<div className={classes.content}>
						<RouterSwitch router={router} />
					</div>
				</div>
			</div>
		</Router>
	);
}


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
		overflowX: 'auto'
	},
}));

export default withRoot(App);
