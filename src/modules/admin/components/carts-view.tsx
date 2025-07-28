"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search, ShoppingCart, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/carts"

type OrderProduct = {
  productId: number
  amount: number
}

type Cart = {
  id: number
  userId: number
  status: string
  addressId: number
  paymentId: number
  createdAt: string
  updatedAt: string
  orderProducts: OrderProduct[]
}

type NewCartPayload = {
  userId: string
  addressId: string
  paymentId: string
}

type NewProductPayload = {
  productId: string
  amount: string
}

export function CartsView() {
  const [carts, setCarts] = useState<Cart[]>([])
  const [searchUserId, setSearchUserId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false)
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null)
  const [newCart, setNewCart] = useState<NewCartPayload>({ userId: "", addressId: "", paymentId: "" })
  const [newProduct, setNewProduct] = useState<NewProductPayload>({ productId: "", amount: "" })

  useEffect(() => {
    async function loadCarts(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch carts')
        const data: Cart[] = await res.json()
        setCarts(data)
      } catch (error) {
        console.error('Error loading carts:', error)
      }
    }
    loadCarts()
  }, [])

  const handleCreateCart = async (): Promise<void> => {
    try {
      const payload = {
        userId: parseInt(newCart.userId, 10),
        addressId: parseInt(newCart.addressId, 10),
        paymentId: parseInt(newCart.paymentId, 10),
        orderProducts: [],
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create cart')
      const created: Cart = await res.json()
      setCarts(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewCart({ userId: "", addressId: "", paymentId: "" })
    } catch (error) {
      console.error("Error creating cart:", error)
    }
  }

  const openAddProductDialog = (cartId: number) => {
    setSelectedCartId(cartId)
    setIsAddProductDialogOpen(true)
  }

  const handleAddProductToCart = async (): Promise<void> => {
    if (selectedCartId === null || !newProduct.productId || !newProduct.amount) return
    try {
      const payload = {
        productId: parseInt(newProduct.productId, 10),
        amount: parseInt(newProduct.amount, 10),
      }
      const res = await fetch(`${API_BASE}/${selectedCartId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to add product')
      const updatedCart: Cart = await res.json()
      setCarts(prev => prev.map(c => c.id === updatedCart.id ? updatedCart : c))
      setIsAddProductDialogOpen(false)
      setNewProduct({ productId: "", amount: "" })
      setSelectedCartId(null)
    } catch (error) {
      console.error("Error adding product to cart:", error)
    }
  }

  const handleDeleteCart = async (cartId: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/${cartId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete cart')
      setCarts(prev => prev.filter(c => c.id !== cartId))
    } catch (error) {
      console.error("Error deleting cart:", error)
    }
  }

  const handleSearchCart = async (): Promise<void> => {
    if (!searchUserId) return
    try {
      const res = await fetch(`${API_BASE}/user/${searchUserId}`)
      if (!res.ok) {
        console.warn('No carts for this user')
        return
      }
      const data: Cart[] = await res.json()
      setCarts(data)
    } catch (error) {
      console.error("Error searching carts by userId:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Carts Management</h2>
          <p className="text-muted-foreground">Manage customer shopping carts</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Create Cart</Button>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Cart</DialogTitle>
            <DialogDescription>Provide user, address and payment IDs</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="User ID" type="number" value={newCart.userId} onChange={e => setNewCart({ ...newCart, userId: e.target.value })} />
            <Input placeholder="Address ID" type="number" value={newCart.addressId} onChange={e => setNewCart({ ...newCart, addressId: e.target.value })} />
            <Input placeholder="Payment ID" type="number" value={newCart.paymentId} onChange={e => setNewCart({ ...newCart, paymentId: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateCart}>Create Cart</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Search by User ID</CardTitle>
          <CardDescription>Fetch all carts for a specific user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter user ID" value={searchUserId} onChange={e => setSearchUserId(e.target.value)} />
            <Button onClick={handleSearchCart}><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carts List</CardTitle>
          <CardDescription>All customer shopping carts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cart ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>#Products</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carts.map(cart => (
                <TableRow key={cart.id}>
                  <TableCell className="font-medium">#{cart.id}</TableCell>
                  <TableCell>{cart.userId}</TableCell>
                  <TableCell>{cart.status}</TableCell>
                  <TableCell>{cart.orderProducts?.length ?? 0}</TableCell>
                  <TableCell>{new Date(cart.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCart(cart.id)}><Trash2 className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => openAddProductDialog(cart.id)}><ShoppingCart className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Product to Cart</DialogTitle>
            <DialogDescription>Specify product and amount</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Product ID" type="number" value={newProduct.productId} onChange={e => setNewProduct({ ...newProduct, productId: e.target.value })} />
            <Input placeholder="Amount" type="number" value={newProduct.amount} onChange={e => setNewProduct({ ...newProduct, amount: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProductToCart}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
