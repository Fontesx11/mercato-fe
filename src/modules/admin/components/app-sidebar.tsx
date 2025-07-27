"use client"

import { BarChart3, Home, Package, ShoppingBag, ShoppingCart, Store, Tag, Users } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    id: "orders",
  },
  {
    title: "Users",
    icon: Users,
    id: "users",
  },
  {
    title: "Products",
    icon: Package,
    id: "products",
  },
  {
    title: "Categories",
    icon: Tag,
    id: "categories",
  },
  {
    title: "Carts",
    icon: ShoppingBag,
    id: "carts",
  },
  {
    title: "Stores",
    icon: Store,
    id: "stores",
  },
]

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <BarChart3 className="h-6 w-6" />
          <span className="font-semibold text-lg">Mercato Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveView(item.id)} isActive={activeView === item.id}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground">Mercato Admin v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
