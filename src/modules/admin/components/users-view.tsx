"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/users"

// TypeScript interfaces
type Address = {
  street: string
  number: number
  complement: string
  cep: string
  cityId: number
}

type User = {
  id: number
  name: string
  email: string
  cpf: string
  typeUser: number
  phone: string
  createdAt: string
  address: Address
}

type NewUserPayload = {
  name: string
  email: string
  cpf: string
  typeUser: string
  phone: string
  password: string
  address: {
    street: string
    number: string
    complement: string
    cep: string
    cityId: string
  }
}

function getUserTypeLabel(typeUser: number): string {
  return typeUser === 1 ? "Customer" : "Admin"
}

export function UsersView() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchType, setSearchType] = useState<string>("id")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newUser, setNewUser] = useState<NewUserPayload>({
    name: "",
    email: "",
    cpf: "",
    typeUser: "1",
    phone: "",
    password: "",
    address: { street: "", number: "", complement: "", cep: "", cityId: "" },
  })

  // Fetch all users on mount
  useEffect(() => {
    async function loadUsers(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch users')
        const data: User[] = await res.json()
        setUsers(data)
      } catch (error) {
        console.error('Error loading users:', error)
      }
    }
    loadUsers()
  }, [])

  // Create new user
  const handleCreateUser = async (): Promise<void> => {
    try {
      const payload = {
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf,
        typeUser: parseInt(newUser.typeUser, 10),
        phone: newUser.phone,
        password: newUser.password,
        address: {
          street: newUser.address.street,
          number: parseInt(newUser.address.number, 10),
          complement: newUser.address.complement,
          cep: newUser.address.cep,
          cityId: parseInt(newUser.address.cityId, 10),
        },
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create user')
      const created: User = await res.json()
      setUsers(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewUser({
        name: "",
        email: "",
        cpf: "",
        typeUser: "1",
        phone: "",
        password: "",
        address: { street: "", number: "", complement: "", cep: "", cityId: "" },
      })
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  // Delete user
  const handleDeleteUser = async (userId: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/${userId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete user')
      setUsers(prev => prev.filter(u => u.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  // Search users
  const handleSearchUser = async (): Promise<void> => {
    if (!searchTerm) return
    try {
      const res = await fetch(`${API_BASE}/${searchType}/${encodeURIComponent(searchTerm)}`)
      if (!res.ok) {
        console.warn('User not found')
        return
      }
      const data = await res.json()
      const list = Array.isArray(data) ? data : [data]
      setUsers(list as User[])
    } catch (error) {
      console.error('Error searching user:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Create User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">{/* form fields here */}</div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateUser}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Search for users by ID, CPF, email, or phone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder={`Enter ${searchType}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <Button onClick={handleSearchUser}><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Users List</CardTitle><CardDescription>All registered users</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>CPF</TableHead><TableHead>Type</TableHead><TableHead>Phone</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cpf}</TableCell>
                  <TableCell><Badge variant={user.typeUser === 2 ? 'default' : 'secondary'}>{getUserTypeLabel(user.typeUser)}</Badge></TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
