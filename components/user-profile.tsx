"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material"
import { MailIcon, PhoneIcon, EditIcon } from "lucide-react"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "IT Department",
    joinDate: "January 15, 2022",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically save the data to your backend
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main" }}
              alt={userData.name}
              src="/placeholder.svg?height=80&width=80"
            >
              {userData.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4">{userData.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {userData.role}
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" name="name" value={userData.name} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" value={userData.email} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" name="phone" value={userData.phone} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={userData.department}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={userData.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary={userData.phone} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Department" secondary={userData.department} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Join Date" secondary={userData.joinDate} />
            </ListItem>
          </List>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Updated user settings"
                  secondary="Today at 2:30 PM"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Completed project milestone"
                  secondary="Yesterday at 11:15 AM"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Submitted quarterly report"
                  secondary="May 10, 2023"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Projects
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Website Redesign"
                  secondary="In Progress - 75% Complete"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Mobile App Development"
                  secondary="In Progress - 40% Complete"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Database Migration"
                  secondary="Completed"
                  secondaryTypographyProps={{ color: "textSecondary" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
