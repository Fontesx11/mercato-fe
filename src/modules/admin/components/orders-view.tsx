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
import { Textarea } from "@/components/ui/textarea"
import { Eye, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/orders"

// TypeScript interfaces
type OrderProduct = {
  productId: number
  amount: number
  productName?: string
}

type Order = {
  id: number
  userId: number
  addressId: number
  paymentId: number
  status: string
  total: number
  createdAt: string
  orderProducts: OrderProduct[]
}

type NewOrderPayload = {
  userId: string
  addressId: string
  paymentId: string
  orderProducts: string
}

export function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchId, setSearchId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newOrder, setNewOrder] = useState<NewOrderPayload>({ userId: "", addressId: "", paymentId: "", orderProducts: "" })

  // Fetch all orders on mount
  useEffect(() => {
    async function loadOrders(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch orders')
        const data: Order[] = await res.json()
        setOrders(data)
      } catch (error) {
        console.error('Error loading orders:', error)
      }
    }
    loadOrders()
  }, [])

  const handleCreateOrder = async (): Promise<void> => {
    try {
      const payload = {
        userId: parseInt(newOrder.userId, 10),
        addressId: parseInt(newOrder.addressId, 10),
        paymentId: parseInt(newOrder.paymentId, 10),
        orderProducts: JSON.parse(newOrder.orderProducts) as Omit<OrderProduct, 'productName'>[],
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const created: Order = await res.json()
      setOrders(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewOrder({ userId: "", addressId: "", paymentId: "", orderProducts: "" })
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  const handleDeleteOrder = async (orderId: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/${orderId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete order')
      setOrders(prev => prev.filter(o => o.id !== orderId))
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  const handleSearchOrder = async (): Promise<void> => {
    if (!searchId) return
    try {
      const res = await fetch(`${API_BASE}/${searchId}`)
      if (!res.ok) {
        console.warn('Order not found')
        return
      }
      const found: Order = await res.json()
      setOrders([found])
    } catch (error) {
      console.error("Error searching order:", error)
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
                <DialogDescription>Create a new order for a customer</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input id="userId" value={newOrder.userId} onChange={e => setNewOrder({ ...newOrder, userId: e.target.value })} placeholder="1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressId">Address ID</Label>
                  <Input id="addressId" value={newOrder.addressId} onChange={e => setNewOrder({ ...newOrder, addressId: e.target.value })} placeholder="1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentId">Payment ID</Label>
                  <Input id="paymentId" value={newOrder.paymentId} onChange={e => setNewOrder({ ...newOrder, paymentId: e.target.value })} placeholder="1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="orderProducts">Order Products (JSON)</Label>
                  <Textarea id="orderProducts" value={newOrder.orderProducts} onChange={e => setNewOrder({ ...newOrder, orderProducts: e.target.value })} placeholder='[{"productId":1,"amount":2}]' rows={4} />
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
                  <TableCell>${order.total.toFixed(2)}</TableCell>
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
