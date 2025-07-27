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
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Caneta Azul",
    price: 15.5,
    image: "http://example.com/caneta-azul.png",
    brand: "BIC",
    description: "Caneta esferográfica azul",
    storeId: 1,
    batch: "11111OAL5",
    validity: "15/06/2025",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Caderno A4",
    price: 25.9,
    image: "http://example.com/caderno.png",
    brand: "Tilibra",
    description: "Caderno universitário 200 folhas",
    storeId: 1,
    batch: "22222OAL6",
    validity: "31/12/2025",
    categoryId: 1,
  },
]

export function ProductsView() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ price1: "", price2: "" })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    description: "",
    storeId: "",
    batch: "",
    validity: "",
    categoryId: "",
  })

  const handleCreateProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        storeId: Number.parseInt(newProduct.storeId),
        categoryId: Number.parseInt(newProduct.categoryId),
      }

      // Here you would make the API call to POST http://localhost:4001/products
      console.log("Creating product:", productData)

      setIsCreateDialogOpen(false)
      setNewProduct({
        name: "",
        price: "",
        image: "",
        brand: "",
        description: "",
        storeId: "",
        batch: "",
        validity: "",
        categoryId: "",
      })
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    try {
      // Here you would make the API call to DELETE http://localhost:4001/products/{id}
      console.log("Deleting product:", productId)
      setProducts(products.filter((product) => product.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleSearchProduct = async () => {
    if (!searchTerm) return

    try {
      // Here you would make the API call to GET http://localhost:4001/products/{id}
      console.log("Searching product by ID:", searchTerm)
    } catch (error) {
      console.error("Error searching product:", error)
    }
  }

  const handleSearchByPrice = async () => {
    if (!priceRange.price1 || !priceRange.price2) return

    try {
      // Here you would make the API call to GET http://localhost:4001/products/price
      console.log("Searching products by price range:", priceRange)
    } catch (error) {
      console.error("Error searching products by price:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products Management</h2>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>Add a new product to your catalog</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Caneta Azul"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="15.50"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="http://example.com/product.png"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    placeholder="BIC"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Input
                    id="batch"
                    value={newProduct.batch}
                    onChange={(e) => setNewProduct({ ...newProduct, batch: e.target.value })}
                    placeholder="11111OAL6"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storeId">Store ID</Label>
                  <Input
                    id="storeId"
                    value={newProduct.storeId}
                    onChange={(e) => setNewProduct({ ...newProduct, storeId: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validity">Validity</Label>
                  <Input
                    id="validity"
                    value={newProduct.validity}
                    onChange={(e) => setNewProduct({ ...newProduct, validity: e.target.value })}
                    placeholder="15/06/2030"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Category ID</Label>
                  <Input
                    id="categoryId"
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProduct}>Create Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Search by ID</CardTitle>
            <CardDescription>Search for a specific product by ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter product ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearchProduct}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search by Price Range</CardTitle>
            <CardDescription>Find products within a price range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Min price"
                type="number"
                step="0.01"
                value={priceRange.price1}
                onChange={(e) => setPriceRange({ ...priceRange, price1: e.target.value })}
              />
              <Input
                placeholder="Max price"
                type="number"
                step="0.01"
                value={priceRange.price2}
                onChange={(e) => setPriceRange({ ...priceRange, price2: e.target.value })}
              />
              <Button onClick={handleSearchByPrice}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>All products in your catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.batch}</TableCell>
                  <TableCell>{product.validity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
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
