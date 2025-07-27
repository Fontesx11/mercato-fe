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
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/products"

// TypeScript interfaces
type Product = {
  id: number
  name: string
  price: number
  image: string
  brand: string
  description: string
  storeId: number
  batch: string
  validity: string
  categoryId: number
}

type PriceRange = {
  price1: string
  price2: string
}

type NewProductPayload = {
  name: string
  price: string
  image: string
  brand: string
  description: string
  storeId: string
  batch: string
  validity: string
  categoryId: string
}

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [priceRange, setPriceRange] = useState<PriceRange>({ price1: "", price2: "" })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newProduct, setNewProduct] = useState<NewProductPayload>({
    name: "", price: "", image: "", brand: "", description: "", storeId: "", batch: "", validity: "", categoryId: ""
  })

  // Fetch all products on mount
  useEffect(() => {
    async function loadProducts(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  const handleCreateProduct = async (): Promise<void> => {
    try {
      const payload = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        brand: newProduct.brand,
        description: newProduct.description,
        storeId: parseInt(newProduct.storeId, 10),
        batch: newProduct.batch,
        validity: newProduct.validity,
        categoryId: parseInt(newProduct.categoryId, 10),
      }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create product')
      const created: Product = await res.json()
      setProducts(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewProduct({ name: "", price: "", image: "", brand: "", description: "", storeId: "", batch: "", validity: "", categoryId: "" })
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleDeleteProduct = async (productId: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/${productId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete product')
      setProducts(prev => prev.filter(p => p.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleSearchProduct = async (): Promise<void> => {
    if (!searchTerm) return
    try {
      const res = await fetch(`${API_BASE}/${searchTerm}`)
      if (!res.ok) {
        console.warn('Product not found')
        return
      }
      const found: Product = await res.json()
      setProducts([found])
    } catch (error) {
      console.error("Error searching product:", error)
    }
  }

  const handleSearchByPrice = async (): Promise<void> => {
    if (!priceRange.price1 || !priceRange.price2) return
    try {
      const res = await fetch(`${API_BASE}/price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price1: parseFloat(priceRange.price1), price2: parseFloat(priceRange.price2) }),
      })
      if (!res.ok) throw new Error('Failed to search by price')
      const data: Product[] = await res.json()
      setProducts(data)
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
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>Add a new product to your catalog</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* form fields as before */}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProduct}>Create Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Search by ID</CardTitle>
            <CardDescription>Search for a specific product by ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter product ID" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Button onClick={handleSearchProduct}><Search className="mr-2 h-4 w-4" />Search</Button>
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
              <Input placeholder="Min price" type="number" step="0.01" value={priceRange.price1} onChange={e => setPriceRange({ ...priceRange, price1: e.target.value })} />
              <Input placeholder="Max price" type="number" step="0.01" value={priceRange.price2} onChange={e => setPriceRange({ ...priceRange, price2: e.target.value })} />
              <Button onClick={handleSearchByPrice}><Search className="mr-2 h-4 w-4" />Search</Button>
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
                <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Brand</TableHead><TableHead>Price</TableHead><TableHead>Batch</TableHead><TableHead>Validity</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.batch}</TableCell>
                  <TableCell>{product.validity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}><Trash2 className="h-4 w-4" /></Button>
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
