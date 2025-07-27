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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"

// Mock data
const mockCarts = [
  {
    id: 1,
    userId: 1,
    addressId: 1,
    paymentId: 1,
    createdAt: "2024-01-15",
    products: [
      { productId: 1, amount: 2, productName: "Caneta Azul" },
      { productId: 2, amount: 1, productName: "Caderno A4" },
    ],
  },
  {
    id: 2,
    userId: 2,
    addressId: 2,
    paymentId: 2,
    createdAt: "2024-01-14",
    products: [{ productId: 3, amount: 3, productName: "Lápis HB" }],
  },
]

export function CartsView() {
  const [carts, setCarts] = useState(mockCarts)
  const [searchId, setSearchId] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [selectedCartId, setSelectedCartId] = useState("")
  const [newCart, setNewCart] = useState({
    userId: "",
    addressId: "",
    paymentId: "",
  })
  const [newProduct, setNewProduct] = useState({
    productId: "",
    amount: "",
  })

  const handleCreateCart = async () => {
    try {
      const cartData = {
        userId: Number.parseInt(newCart.userId),
        addressId: Number.parseInt(newCart.addressId),
        paymentId: Number.parseInt(newCart.paymentId),
        orderProducts: [],
      }

      // Here you would make the API call to POST http://localhost:4001/carts
      console.log("Creating cart:", cartData)

      setIsCreateDialogOpen(false)
      setNewCart({ userId: "", addressId: "", paymentId: "" })
    } catch (error) {
      console.error("Error creating cart:", error)
    }
  }

  const handleAddProductToCart = async () => {
    try {
      const productData = {
        productId: Number.parseInt(newProduct.productId),
        amount: Number.parseInt(newProduct.amount),
      }

      // Here you would make the API call to POST http://localhost:4001/carts/{cartId}/products
      console.log(`Adding product to cart ${selectedCartId}:`, productData)

      setIsAddProductDialogOpen(false)
      setNewProduct({ productId: "", amount: "" })
      setSelectedCartId("")
    } catch (error) {
      console.error("Error adding product to cart:", error)
    }
  }

  const handleDeleteCart = async (cartId: number) => {
    try {
      // Here you would make the API call to DELETE http://localhost:4001/carts/{id}
      console.log("Deleting cart:", cartId)
      setCarts(carts.filter((cart) => cart.id !== cartId))
    } catch (error) {
      console.error("Error deleting cart:", error)
    }
  }

  const handleSearchCart = async () => {
    if (!searchId) return

    try {
      // Here you would make the API call to GET http://localhost:4001/carts/{id}
      console.log("Searching cart by ID:", searchId)
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Cart
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Cart</DialogTitle>
                <DialogDescription>Create a new shopping cart for a customer</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={newCart.userId}
                    onChange={(e) => setNewCart({ ...newCart, userId: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressId">Address ID</Label>
                  <Input
                    id="addressId"
                    value={newCart.addressId}
                    onChange={(e) => setNewCart({ ...newCart, addressId: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentId">Payment ID</Label>
                  <Input
                    id="paymentId"
                    value={newCart.paymentId}
                    onChange={(e) => setNewCart({ ...newCart, paymentId: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCart}>Create Cart</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product to Cart</DialogTitle>
                <DialogDescription>Add a product to an existing cart</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cartId">Cart ID</Label>
                  <Input
                    id="cartId"
                    value={selectedCartId}
                    onChange={(e) => setSelectedCartId(e.target.value)}
                    placeholder="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    value={newProduct.productId}
                    onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
                    placeholder="2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newProduct.amount}
                    onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value })}
                    placeholder="2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProductToCart}>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Carts</CardTitle>
          <CardDescription>Search for carts by ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter cart ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <Button onClick={handleSearchCart}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
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
                <TableHead>Products Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carts.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell className="font-medium">#{cart.id}</TableCell>
                  <TableCell>{cart.userId}</TableCell>
                  <TableCell>{cart.products.length} items</TableCell>
                  <TableCell>{cart.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCart(cart.id)}>
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
