// prettier-ignore
import { Badge, Divider, Drawer as DrawerMui, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useRoutesActive } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import { useCloseDrawer, useOpenDrawer } from '../controller/drawerController';
import { Todo } from '../model/todo';
import { router } from '../Router';
import { drawerState } from '../state/drawerState';
import { todosState } from '../state/todosState';

export function Drawer() {
	const classes = useStyles();
	const drawerOpen: boolean = useRecoilValue(drawerState)
	const closeDrawer = useCloseDrawer()
	const openDrawer = useOpenDrawer()


	const handleDrawerToggle = () => {
		if (drawerOpen) {
			closeDrawer()
		} else {
			openDrawer()
		}
	};

	return (
		<>
			<Hidden mdUp>
				<DrawerMui
					variant="temporary"
					anchor={'left'}
					open={drawerOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
			<Hidden smDown>
				<DrawerMui
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
		</>
	);
}

function Content() {
	const classes = useStyles();
	const todoList = useRecoilValue(todosState);
	const history = useHistory();

	const { home, todo, joke } = useRoutesActive({
		home: router.home,
		todo: router.todo,
		joke: router.joke
	});

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push(router.home().$)} selected={home}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push(router.todo().$)} selected={todo}>
					<ListItemIcon>
						<TodoIcon todoList={todoList} />
					</ListItemIcon>
					<ListItemText primary="Todo" />
				</ListItem>
			</List>
			<List>
				<ListItem button onClick={() => history.push(router.joke().$)} selected={joke}>
					<ListItemIcon>
						<FormatListNumberedIcon />
					</ListItemIcon>
					<ListItemText primary="Joke" />
				</ListItem>
			</List>
		</div>
	);
}

function TodoIcon(props: { todoList: Todo[] }) {
	let uncompletedTodos = props.todoList.filter(t => t.completed === false);

	if (uncompletedTodos.length > 0) {
		return (
			<Badge color="secondary" badgeContent={uncompletedTodos.length}>
				<FormatListNumberedIcon />
			</Badge>
		);
	} else {
		return <FormatListNumberedIcon />;
	}
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			position: 'relative',
			height: '100%',
		},
	},
}));
