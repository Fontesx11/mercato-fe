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
import { Eye, Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = "http://localhost:4001/categories"

// TypeScript interfaces
type Category = {
  id: number
  name: string
  createdAt: string
}

type NewCategoryPayload = {
  name: string
}

export function CategoriesView() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchId, setSearchId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [newCategory, setNewCategory] = useState<NewCategoryPayload>({ name: "" })

  // Fetch all categories on mount
  useEffect(() => {
    async function loadCategories(): Promise<void> {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data: Category[] = await res.json()
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  const handleCreateCategory = async (): Promise<void> => {
    try {
      const payload = { name: newCategory.name }
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create category')
      const created: Category = await res.json()
      setCategories(prev => [...prev, created])
      setIsCreateDialogOpen(false)
      setNewCategory({ name: "" })
    } catch (error) {
      console.error("Error creating category:", error)
    }
  }

  const handleSearchCategory = async (): Promise<void> => {
    if (!searchId) return
    try {
      const res = await fetch(`${API_BASE}/${searchId}`)
      if (!res.ok) {
        console.warn('Category not found')
        return
      }
      const found: Category = await res.json()
      setCategories([found])
    } catch (error) {
      console.error("Error searching category:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories Management</h2>
          <p className="text-muted-foreground">Organize your products with categories</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>Add a new category to organize your products</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={e => setNewCategory({ name: e.target.value })}
                    placeholder="Papelaria"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateCategory}>Create Category</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
          <CardDescription>Search for categories by ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter category ID"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
            />
            <Button onClick={handleSearchCategory}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
          <CardDescription>All product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
