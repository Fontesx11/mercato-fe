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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/orders"

interface OrderProduct {
  productId: number
  amount: number
  price: number
  total: number
}

interface Order {
  id: number
  userId: number
  addressId: number
  paymentId: number
  status: string
  total: number
  createdAt: string
  orderProducts: OrderProduct[]
}

interface NewOrderPayload {
  userId: number | ""
  paymentId: number | ""
  orderProducts: { productId: number; amount: number }[]
}

export function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchId, setSearchId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newOrder, setNewOrder] = useState<NewOrderPayload>({
    userId: "",
    paymentId: "",
    orderProducts: [{ productId: 0, amount: 1 }],
  })

  // Load all orders and compute total from backend-provided orderProducts.total
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch orders')
        const data: Order[] = await res.json()
        const enriched = data.map(order => ({
          ...order,
          total: order.orderProducts.reduce((sum, item) => sum + (item.total ?? 0), 0),
        }))
        setOrders(enriched)
      } catch (error) {
        console.error('Error loading orders:', error)
      }
    }
    loadOrders()
  }, [])

  const handleAddProductRow = () => {
    setNewOrder(prev => ({
      ...prev,
      orderProducts: [...prev.orderProducts, { productId: 0, amount: 1 }]
    }))
  }

  const handleRemoveProductRow = (index: number) => {
    setNewOrder(prev => ({
      ...prev,
      orderProducts: prev.orderProducts.filter((_, i) => i !== index)
    }))
  }

  const handleProductChange = (index: number, field: 'productId' | 'amount', value: number) => {
    setNewOrder(prev => {
      const products = [...prev.orderProducts]
      products[index] = { ...products[index], [field]: value }
      return { ...prev, orderProducts: products }
    })
  }

  const handleCreateOrder = async () => {
    try {
      const payload = {
        userId: Number(newOrder.userId),
        addressId: Number(newOrder.userId),
        paymentId: Number(newOrder.paymentId),
        orderProducts: newOrder.orderProducts,
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const created: Order = await res.json()
      // compute total from created.orderProducts.total
      const total = created.orderProducts.reduce((sum, item) => sum + (item.total ?? 0), 0)
      setOrders(prev => [...prev, { ...created, total }])
      setIsCreateDialogOpen(false)
      setNewOrder({ userId: "", paymentId: "", orderProducts: [{ productId: 0, amount: 1 }] })
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const res = await fetch(`${API_BASE}/${orderId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete order')
      setOrders(prev => prev.filter(o => o.id !== orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const handleSearchOrder = async () => {
    if (!searchId) return
    try {
      const res = await fetch(`${API_BASE}/${searchId}`)
      if (!res.ok) {
        console.warn('Order not found')
        return
      }
      const found: Order = await res.json()
      const total = found.orderProducts.reduce((sum, item) => sum + (item.total ?? 0), 0)
      setOrders([{ ...found, total }])
    } catch (error) {
      console.error('Error searching order:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
          <p className="text-muted-foreground">Manage customer orders and track their status</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>Create a new order for a customer (address auto by user)</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input id="userId" type="number" value={newOrder.userId} onChange={e => setNewOrder({ ...newOrder, userId: Number(e.target.value) })} placeholder="1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentId">Payment ID</Label>
                  <Input id="paymentId" type="number" value={newOrder.paymentId} onChange={e => setNewOrder({ ...newOrder, paymentId: Number(e.target.value) })} placeholder="1" />
                </div>
                <div className="grid gap-2">
                  <Label>Order Products</Label>
                  {newOrder.orderProducts.map((prod, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <div className="grid gap-1">
                        <Label>Product ID</Label>
                        <Input type="number" min={1} placeholder="ID" value={prod.productId} onChange={e => handleProductChange(idx, 'productId', Number(e.target.value))} />
                      </div>
                      <div className="grid gap-1">
                        <Label>Quantity</Label>
                        <Input type="number" min={1} placeholder="Qty" value={prod.amount} onChange={e => handleProductChange(idx, 'amount', Number(e.target.value))} />
                      </div>
                      {newOrder.orderProducts.length > 1 && (
                        <Button variant="outline" size="sm" className="col-span-2" onClick={() => handleRemoveProductRow(idx)}>Remove this product</Button>
                      )}
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="mt-2" onClick={handleAddProductRow}>Add Product</Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateOrder}>Create Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Search Orders</CardTitle><CardDescription>Search for orders by ID</CardDescription></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter order ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
            <Button onClick={handleSearchOrder}><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Orders List</CardTitle><CardDescription>All customer orders</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Order ID</TableHead><TableHead>User ID</TableHead><TableHead>Status</TableHead><TableHead>Total</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell><Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>{order.status}</Badge></TableCell>
                  <TableCell>${(order.total ?? 0).toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)}><Trash2 className="h-4 w-4" /></Button>
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
