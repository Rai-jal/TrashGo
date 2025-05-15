"use client"

import { useState } from "react"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material"
import {
  MenuIcon,
  DotIcon as DashboardIcon,
  PersonStandingIcon as PersonIcon,
  SettingsIcon,
  BarChartIcon,
  CalendarIcon as NotificationsIcon,
} from "lucide-react"
import DataTable from "@/components/data-table"
import Chart from "@/components/chart"
import UserProfile from "@/components/user-profile"

const drawerWidth = 240

export default function Dashboard({ toggleTheme, currentTheme }) {
  const [open, setOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardContent />
      case "users":
        return <UserProfile />
      case "reports":
        return <Chart />
      case "settings":
        return <SettingsContent toggleTheme={toggleTheme} currentTheme={currentTheme} />
      default:
        return <DashboardContent />
    }
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            React Material UI Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 64,
            boxSizing: "border-box",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage("dashboard")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage("users")}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Users" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage("reports")}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Reports" />}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage("settings")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Settings" />}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 64}px)` },
          ml: { sm: `${open ? drawerWidth : 64}px` },
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </>
  )
}

function DashboardContent() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3">1,254</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h3">$15,420</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tasks
              </Typography>
              <Typography variant="h3">24/48</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2">• User John Doe logged in</Typography>
            <Typography variant="body2">• New order #1234 received</Typography>
            <Typography variant="body2">• Server maintenance completed</Typography>
            <Typography variant="body2">• Weekly report generated</Typography>
          </Paper>
        </Grid>

        {/* Data Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <DataTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

function SettingsContent({ toggleTheme, currentTheme }) {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Application Settings
        </Typography>
        <FormControlLabel
          control={<Switch checked={currentTheme === "dark"} onChange={toggleTheme} />}
          label="Dark Mode"
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Preferences
        </Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
        <FormControlLabel control={<Switch />} label="SMS Notifications" />
      </Paper>
    </Container>
  )
}
