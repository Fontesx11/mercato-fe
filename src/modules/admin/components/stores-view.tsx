"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

// Mock data
const mockStores = [
  {
    id: 1,
    name: "Loja do Mercatto Online",
    cnpj: "12345678000199",
    email: "contato@mercatto.com",
    description: "A melhor loja de todas!",
    phone: "81912345678",
    logo_url: "http://example.com/logo.png",
    userId: 1,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Papelaria Central",
    cnpj: "98765432000188",
    email: "contato@papelaria.com",
    description: "Sua papelaria de confiança",
    phone: "81987654321",
    logo_url: "http://example.com/logo2.png",
    userId: 2,
    createdAt: "2024-01-14",
  },
]

export function StoresView() {
  const [stores, setStores] = useState(mockStores)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("id")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newStore, setNewStore] = useState({
    name: "",
    cnpj: "",
    email: "",
    password: "",
    description: "",
    phone: "",
    logo_url: "",
    userId: "",
    address: {
      street: "",
      number: "",
      complement: "",
      cep: "",
      cityId: "",
    },
  })

  const handleCreateStore = async () => {
    try {
      const storeData = {
        ...newStore,
        userId: Number.parseInt(newStore.userId),
        address: {
          ...newStore.address,
          number: Number.parseInt(newStore.address.number),
          cityId: Number.parseInt(newStore.address.cityId),
        },
      }

      // Here you would make the API call to POST http://localhost:4001/stores
      console.log("Creating store:", storeData)

      setIsCreateDialogOpen(false)
      setNewStore({
        name: "",
        cnpj: "",
        email: "",
        password: "",
        description: "",
        phone: "",
        logo_url: "",
        userId: "",
        address: {
          street: "",
          number: "",
          complement: "",
          cep: "",
          cityId: "",
        },
      })
    } catch (error) {
      console.error("Error creating store:", error)
    }
  }

  const handleDeleteStore = async (storeId: number) => {
    try {
      // Here you would make the API call to DELETE http://localhost:4001/stores/{id}
      console.log("Deleting store:", storeId)
      setStores(stores.filter((store) => store.id !== storeId))
    } catch (error) {
      console.error("Error deleting store:", error)
    }
  }

  const handleSearchStore = async () => {
    if (!searchTerm) return

    try {
      // Here you would make the API call based on search type
      // GET http://localhost:4001/stores/{id|cnpj|email|name}
      console.log(`Searching store by ${searchType}:`, searchTerm)
    } catch (error) {
      console.error("Error searching store:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stores Management</h2>
          <p className="text-muted-foreground">Manage partner stores and their information</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Store
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Store</DialogTitle>
              <DialogDescription>Add a new partner store to the platform</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={newStore.name}
                    onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    placeholder="Loja do Mercatto Online"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={newStore.cnpj}
                    onChange={(e) => setNewStore({ ...newStore, cnpj: e.target.value })}
                    placeholder="12345678000199"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={newStore.email}
                    onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                    placeholder="contato@mercatto.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storePhone">Phone</Label>
                  <Input
                    id="storePhone"
                    value={newStore.phone}
                    onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                    placeholder="81912345678"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storePassword">Password</Label>
                  <Input
                    id="storePassword"
                    type="password"
                    value={newStore.password}
                    onChange={(e) => setNewStore({ ...newStore, password: e.target.value })}
                    placeholder="Strong password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeUserId">User ID</Label>
                  <Input
                    id="storeUserId"
                    value={newStore.userId}
                    onChange={(e) => setNewStore({ ...newStore, userId: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={newStore.logo_url}
                  onChange={(e) => setNewStore({ ...newStore, logo_url: e.target.value })}
                  placeholder="http://example.com/logo.png"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="storeDescription">Description</Label>
                <Textarea
                  id="storeDescription"
                  value={newStore.description}
                  onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                  placeholder="A melhor loja de todas!"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Street"
                    value={newStore.address.street}
                    onChange={(e) =>
                      setNewStore({ ...newStore, address: { ...newStore.address, street: e.target.value } })
                    }
                  />
                  <Input
                    placeholder="Number"
                    value={newStore.address.number}
                    onChange={(e) =>
                      setNewStore({ ...newStore, address: { ...newStore.address, number: e.target.value } })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Complement"
                    value={newStore.address.complement}
                    onChange={(e) =>
                      setNewStore({ ...newStore, address: { ...newStore.address, complement: e.target.value } })
                    }
                  />
                  <Input
                    placeholder="CEP"
                    value={newStore.address.cep}
                    onChange={(e) =>
                      setNewStore({ ...newStore, address: { ...newStore.address, cep: e.target.value } })
                    }
                  />
                </div>
                <Input
                  placeholder="City ID"
                  value={newStore.address.cityId}
                  onChange={(e) =>
                    setNewStore({ ...newStore, address: { ...newStore.address, cityId: e.target.value } })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateStore}>Create Store</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Stores</CardTitle>
          <CardDescription>Search for stores by ID, CNPJ, email, or name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`Enter ${searchType}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearchStore}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stores List</CardTitle>
          <CardDescription>All registered stores</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.id}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.cnpj}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>{store.phone}</TableCell>
                  <TableCell>{store.userId}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteStore(store.id)}>
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
