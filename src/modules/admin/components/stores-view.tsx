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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/stores"

// TypeScript interfaces
interface Address {
  street: string
  number: number
  complement: string
  cep: string
  cityId: number
}

interface Store {
  id: number
  name: string
  cnpj: string
  email: string
  description: string
  phone: string
  logo_url: string
  userId: number
  createdAt: string
  address: Address
}

interface NewStorePayload {
  name: string
  cnpj: string
  email: string
  description: string
  phone: string
  logo_url: string
  userId: string
  address: {
    street: string
    number: string
    complement: string
    cep: string
    cityId: string
  }
}

export function StoresView() {
  const [stores, setStores] = useState<Store[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchType, setSearchType] = useState<string>("id")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newStore, setNewStore] = useState<NewStorePayload>({
    name: "",
    cnpj: "",
    email: "",
    description: "",
    phone: "",
    logo_url: "",
    userId: "",
    address: { street: "", number: "", complement: "", cep: "", cityId: "" },
  })

  useEffect(() => {
    async function loadStores(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch stores')
        const data: Store[] = await res.json()
        setStores(data)
      } catch (error) {
        console.error('Error loading stores:', error)
      }
    }
    loadStores()
  }, [])

  const handleCreateStore = async (): Promise<void> => {
    try {
      const payload = {
        name: newStore.name,
        cnpj: newStore.cnpj,
        email: newStore.email,
        description: newStore.description,
        phone: newStore.phone,
        logo_url: newStore.logo_url,
        userId: parseInt(newStore.userId, 10),
        address: {
          street: newStore.address.street,
          number: parseInt(newStore.address.number, 10),
          complement: newStore.address.complement,
          cep: newStore.address.cep,
          cityId: parseInt(newStore.address.cityId, 10),
        },
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create store')
      const created: Store = await res.json()
      setStores(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewStore({
        name: "",
        cnpj: "",
        email: "",
        description: "",
        phone: "",
        logo_url: "",
        userId: "",
        address: { street: "", number: "", complement: "", cep: "", cityId: "" },
      })
    } catch (error) {
      console.error("Error creating store:", error)
    }
  }

  const handleDeleteStore = async (storeId: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/${storeId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete store')
      setStores(prev => prev.filter(s => s.id !== storeId))
    } catch (error) {
      console.error("Error deleting store:", error)
    }
  }

  const handleSearchStore = async (): Promise<void> => {
    if (!searchTerm) return
    try {
      const res = await fetch(`${API_BASE}/${searchType}/${encodeURIComponent(searchTerm)}`)
      if (!res.ok) {
        console.warn('Store not found')
        return
      }
      const data = await res.json()
      const list = Array.isArray(data) ? data : [data]
      setStores(list as Store[])
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
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create Store</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Store</DialogTitle>
                <DialogDescription>Add a new partner store to the platform</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                <Input
                  placeholder="Name"
                  value={newStore.name}
                  onChange={e => setNewStore(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="CNPJ"
                  value={newStore.cnpj}
                  onChange={e => setNewStore(prev => ({ ...prev, cnpj: e.target.value }))}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newStore.email}
                  onChange={e => setNewStore(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  placeholder="Description"
                  value={newStore.description}
                  onChange={e => setNewStore(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="Phone"
                  value={newStore.phone}
                  onChange={e => setNewStore(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Input
                  placeholder="Logo URL"
                  value={newStore.logo_url}
                  onChange={e => setNewStore(prev => ({ ...prev, logo_url: e.target.value }))}
                />
                <Input
                  placeholder="User ID"
                  type="number"
                  value={newStore.userId}
                  onChange={e => setNewStore(prev => ({ ...prev, userId: e.target.value }))}
                />
                {/* Address fields */}
                <Input
                  placeholder="Street"
                  value={newStore.address.street}
                  onChange={e => setNewStore(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                />
                <Input
                  placeholder="Number"
                  type="number"
                  value={newStore.address.number}
                  onChange={e => setNewStore(prev => ({ ...prev, address: { ...prev.address, number: e.target.value } }))}
                />
                <Input
                  placeholder="Complement"
                  value={newStore.address.complement}
                  onChange={e => setNewStore(prev => ({ ...prev, address: { ...prev.address, complement: e.target.value } }))}
                />
                <Input
                  placeholder="CEP"
                  value={newStore.address.cep}
                  onChange={e => setNewStore(prev => ({ ...prev, address: { ...prev.address, cep: e.target.value } }))}
                />
                <Input
                  placeholder="City ID"
                  type="number"
                  value={newStore.address.cityId}
                  onChange={e => setNewStore(prev => ({ ...prev, address: { ...prev.address, cityId: e.target.value } }))}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateStore}>Create Store</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Stores</CardTitle>
          <CardDescription>Search for stores by ID, CNPJ, email, or name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder={`Enter ${searchType}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <Button onClick={handleSearchStore}><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Stores List</CardTitle><CardDescription>All registered stores</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>CNPJ</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>User ID</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {stores.map(store => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.id}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.cnpj}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>{store.phone}</TableCell>
                  <TableCell>{store.userId}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteStore(store.id)}><Trash2 className="h-4 w-4" /></Button>
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
