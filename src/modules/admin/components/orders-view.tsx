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
import { useState } from "react"

// Mock data
const mockOrders = [
  {
    id: 1,
    userId: 1,
    addressId: 1,
    paymentId: 1,
    status: "Pending",
    total: 125.5,
    createdAt: "2024-01-15",
    orderProducts: [
      { productId: 1, amount: 2, productName: "Caneta Azul" },
      { productId: 2, amount: 1, productName: "Caderno A4" },
    ],
  },
  {
    id: 2,
    userId: 2,
    addressId: 2,
    paymentId: 2,
    status: "Completed",
    total: 89.99,
    createdAt: "2024-01-14",
    orderProducts: [{ productId: 3, amount: 3, productName: "Lápis HB" }],
  },
]

export function OrdersView() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchId, setSearchId] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newOrder, setNewOrder] = useState({
    userId: "",
    addressId: "",
    paymentId: "",
    orderProducts: "",
  })

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        userId: Number.parseInt(newOrder.userId),
        addressId: Number.parseInt(newOrder.addressId),
        paymentId: Number.parseInt(newOrder.paymentId),
        orderProducts: JSON.parse(newOrder.orderProducts),
      }

      // Here you would make the API call to POST http://localhost:4001/orders
      console.log("Creating order:", orderData)

      setIsCreateDialogOpen(false)
      setNewOrder({ userId: "", addressId: "", paymentId: "", orderProducts: "" })
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  const handleDeleteOrder = async (orderId: number) => {
    try {
      // Here you would make the API call to DELETE http://localhost:4001/orders/{id}
      console.log("Deleting order:", orderId)
      setOrders(orders.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  const handleSearchOrder = async () => {
    if (!searchId) return

    try {
      // Here you would make the API call to GET http://localhost:4001/orders/{id}
      console.log("Searching order by ID:", searchId)
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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>Create a new order for a customer</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  value={newOrder.userId}
                  onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressId">Address ID</Label>
                <Input
                  id="addressId"
                  value={newOrder.addressId}
                  onChange={(e) => setNewOrder({ ...newOrder, addressId: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentId">Payment ID</Label>
                <Input
                  id="paymentId"
                  value={newOrder.paymentId}
                  onChange={(e) => setNewOrder({ ...newOrder, paymentId: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderProducts">Order Products (JSON)</Label>
                <Textarea
                  id="orderProducts"
                  value={newOrder.orderProducts}
                  onChange={(e) => setNewOrder({ ...newOrder, orderProducts: e.target.value })}
                  placeholder='[{"productId": 1, "amount": 2}]'
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrder}>Create Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Orders</CardTitle>
          <CardDescription>Search for orders by ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter order ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <Button onClick={handleSearchOrder}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
          <CardDescription>All customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "Completed" ? "default" : "secondary"}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)}>
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
