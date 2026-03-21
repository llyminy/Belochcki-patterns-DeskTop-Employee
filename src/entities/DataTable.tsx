import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

interface DataTableProps {
  data: any[];
  onDelete: (id: string) => void;
  onLock: (user: any) => void;
  onEdit: (user: any) => void;
  onRowClick: (user: any) => void;
}

export default function DataTable({ data, onDelete, onLock, onEdit, onRowClick }: DataTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id} hover onClick={() => onRowClick(user)} sx={{ cursor: "pointer" }}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.login}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell sx={{ display: "flex", gap: 1 }}>
              <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onEdit(user); }}>
                Edit
              </Button>
              <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onLock(user); }}>
                {user.status === "LOCKED" ? "Unlock" : "Lock"}
              </Button>
              <Button size="small" color="error" variant="outlined" onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}