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
import { useState } from "react"

// Mock data
const mockCategories = [
  {
    id: 1,
    name: "Papelaria",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Eletrônicos",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Livros",
    createdAt: "2024-01-13",
  },
]

export function CategoriesView() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchId, setSearchId] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
  })

  const handleCreateCategory = async () => {
    try {
      // Here you would make the API call to POST http://localhost:4001/categories
      console.log("Creating category:", newCategory)

      const newCat = {
        id: categories.length + 1,
        name: newCategory.name,
        createdAt: new Date().toISOString().split("T")[0],
      }

      setCategories([...categories, newCat])
      setIsCreateDialogOpen(false)
      setNewCategory({ name: "" })
    } catch (error) {
      console.error("Error creating category:", error)
    }
  }

  const handleSearchCategory = async () => {
    if (!searchId) return

    try {
      // Here you would make the API call to GET http://localhost:4001/categories/{id}
      console.log("Searching category by ID:", searchId)
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
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Papelaria"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCategory}>Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
          <CardDescription>Search for categories by ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Enter category ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
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
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.createdAt}</TableCell>
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
