import * as React from "react"
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    MuiAppBarColorPrimary: {
        backgroundColor: `silver`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
        fontFamily:`cursive`
    }
});

const navLinks = [
    { title: `Flights`, path: `/flightsBoard` },
    { title: `Surprise Me`, path: `/` },
    { title: `Feedbacks`, path: `/feedbacksBoard` },
    { title: `My Flights`, path: `/` },
    { title: `My Favr💗its`, path: `/` },
    { title: `Wheather`, path: `/` },
    { title: `Statistics`, path: `/` },

]

const NavBar = () => {
    const classes = useStyles(); // Add this
    return (
        <AppBar position="static" style={{ backgroundColor: `#373a40`}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                    <Home fontSize="large" />
                </IconButton>
                {/* Add code */}
                <List component="nav" aria-labelledby="main navigation">
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex} // this
                    >
                        {navLinks.map(({ title, path }) => (
                            <a href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </List>
                {/* Add code end */}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar