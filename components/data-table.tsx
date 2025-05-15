"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material"

// Sample data
const createData = (id, name, email, role, status) => {
  return { id, name, email, role, status }
}

const rows = [
  createData(1, "John Doe", "john@example.com", "Admin", "Active"),
  createData(2, "Jane Smith", "jane@example.com", "User", "Active"),
  createData(3, "Bob Johnson", "bob@example.com", "User", "Inactive"),
  createData(4, "Alice Brown", "alice@example.com", "Manager", "Active"),
  createData(5, "Charlie Davis", "charlie@example.com", "User", "Active"),
  createData(6, "Eva Wilson", "eva@example.com", "User", "Active"),
  createData(7, "Frank Miller", "frank@example.com", "User", "Inactive"),
  createData(8, "Grace Taylor", "grace@example.com", "Manager", "Active"),
  createData(9, "Henry Clark", "henry@example.com", "User", "Active"),
  createData(10, "Ivy Martin", "ivy@example.com", "User", "Active"),
]

export default function DataTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}
