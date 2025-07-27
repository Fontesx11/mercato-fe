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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    cpf: "12345678901",
    typeUser: 1,
    phone: "81987654321",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    cpf: "98765432101",
    typeUser: 2,
    phone: "81123456789",
    createdAt: "2024-01-14",
  },
]

export function UsersView() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("id")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    cpf: "",
    typeUser: "1",
    phone: "",
    password: "",
    address: {
      street: "",
      number: "",
      complement: "",
      cep: "",
      cityId: "",
    },
  })

  const handleCreateUser = async () => {
    try {
      const userData = {
        ...newUser,
        typeUser: Number.parseInt(newUser.typeUser),
        address: {
          ...newUser.address,
          number: Number.parseInt(newUser.address.number),
          cityId: Number.parseInt(newUser.address.cityId),
        },
      }

      // Here you would make the API call to POST http://localhost:4001/users
      console.log("Creating user:", userData)

      setIsCreateDialogOpen(false)
      setNewUser({
        name: "",
        email: "",
        cpf: "",
        typeUser: "1",
        phone: "",
        password: "",
        address: {
          street: "",
          number: "",
          complement: "",
          cep: "",
          cityId: "",
        },
      })
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      // Here you would make the API call to DELETE http://localhost:4001/users/{id}
      console.log("Deleting user:", userId)
      setUsers(users.filter((user) => user.id !== userId))
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const handleSearchUser = async () => {
    if (!searchTerm) return

    try {
      // Here you would make the API call based on search type
      // GET http://localhost:4001/users/{id|cpf|email|phone}
      console.log(`Searching user by ${searchType}:`, searchTerm)
    } catch (error) {
      console.error("Error searching user:", error)
    }
  }

  const getUserTypeLabel = (typeUser: number) => {
    return typeUser === 1 ? "Customer" : "Admin"
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="João Silva"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="joao@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={newUser.cpf}
                    onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                    placeholder="12345678901"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="81987654321"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="typeUser">User Type</Label>
                  <Select
                    value={newUser.typeUser}
                    onValueChange={(value) => setNewUser({ ...newUser, typeUser: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Customer</SelectItem>
                      <SelectItem value="2">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Strong password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Street"
                    value={newUser.address.street}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: { ...newUser.address, street: e.target.value } })
                    }
                  />
                  <Input
                    placeholder="Number"
                    value={newUser.address.number}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: { ...newUser.address, number: e.target.value } })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Complement"
                    value={newUser.address.complement}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: { ...newUser.address, complement: e.target.value } })
                    }
                  />
                  <Input
                    placeholder="CEP"
                    value={newUser.address.cep}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, cep: e.target.value } })}
                  />
                </div>
                <Input
                  placeholder="City ID"
                  value={newUser.address.cityId}
                  onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, cityId: e.target.value } })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
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
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`Enter ${searchType}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearchUser}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>All registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cpf}</TableCell>
                  <TableCell>
                    <Badge variant={user.typeUser === 2 ? "default" : "secondary"}>
                      {getUserTypeLabel(user.typeUser)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
