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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search, ShoppingCart, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/carts"

type OrderProduct = {
  productId: number
  amount: number
  productName?: string
}

type Cart = {
  id: number
  userId: number
  addressId: number
  paymentId: number
  createdAt: string
  products: OrderProduct[]
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
  const [searchId, setSearchId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false)
  const [selectedCartId, setSelectedCartId] = useState<string>("")
  const [newCart, setNewCart] = useState<NewCartPayload>({ userId: "", addressId: "", paymentId: "" })
  const [newProduct, setNewProduct] = useState<NewProductPayload>({ productId: "", amount: "" })

  // Fetch all carts on mount
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
        orderProducts: [] as OrderProduct[],
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

  const handleAddProductToCart = async (): Promise<void> => {
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
      const updated: Cart = await res.json()
      setCarts(prev => prev.map(c => c.id === updated.id ? updated : c))
      setIsAddProductDialogOpen(false)
      setNewProduct({ productId: "", amount: "" })
      setSelectedCartId("")
    } catch (error) {
      console.error("Error adding product to cart:", error)
    }
  }

  // Delete cart by ID
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
    if (!searchId) return
    try {
      const res = await fetch(`${API_BASE}/${searchId}`)
      if (!res.ok) {
        console.warn('Cart not found')
        return
      }
      const found: Cart = await res.json()
      setCarts([found])
    } catch (error) {
      console.error("Error searching cart:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Carts Management</h2>
          <p className="text-muted-foreground">Manage customer shopping carts</p>
        </div>
        <div className="flex gap-2">
          {/* Create Cart Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create Cart</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Cart</DialogTitle>
                <DialogDescription>Create a new shopping cart for a customer</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* inputs... */}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateCart}>Create Cart</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Product Dialog */}
          <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><ShoppingCart className="mr-2 h-4 w-4" />Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product to Cart</DialogTitle>
                <DialogDescription>Add a product to an existing cart</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* inputs... */}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddProductToCart}>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader><CardTitle>Search Carts</CardTitle><CardDescription>Search for carts by ID</CardDescription></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter cart ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
            <Button onClick={handleSearchCart}><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Carts Table */}
      <Card>
        <CardHeader><CardTitle>Carts List</CardTitle><CardDescription>All customer shopping carts</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Cart ID</TableHead><TableHead>User ID</TableHead><TableHead>Products Count</TableHead><TableHead>Created At</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {carts.map(cart => (
                <TableRow key={cart.id}>
                  <TableCell className="font-medium">#{cart.id}</TableCell>
                  <TableCell>{cart.userId}</TableCell>
                  <TableCell>{cart.products.length} items</TableCell>
                  <TableCell>{new Date(cart.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCart(cart.id)}><Trash2 className="h-4 w-4" /></Button>
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
