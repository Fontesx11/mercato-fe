import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, Package, Store } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      description: "+20.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Total Users",
      value: "2,350",
      description: "+180.1% from last month",
      icon: Users,
    },
    {
      title: "Total Products",
      value: "12,234",
      description: "+19% from last month",
      icon: Package,
    },
    {
      title: "Active Stores",
      value: "573",
      description: "+201 since last hour",
      icon: Store,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Bem vindo ao Mercato admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New order #3210 created</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">User "João Silva" registered</p>
                  <p className="text-sm text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Product "Caneta Azul" updated</p>
                  <p className="text-sm text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <ShoppingCart className="h-4 w-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Create New Order</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Package className="h-4 w-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Add New Product</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Users className="h-4 w-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Manage Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
