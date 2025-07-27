"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"
import { AppSidebar } from "../components/app-sidebar"
import { CartsView } from "../components/carts-view"
import { CategoriesView } from "../components/categories-view"
import { DashboardOverview } from "../components/dashboard-overview"
import { OrdersView } from "../components/orders-view"
import { ProductsView } from "../components/products-view"
import { StoresView } from "../components/stores-view"
import { UsersView } from "../components/users-view"

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "orders":
        return <OrdersView />
      case "users":
        return <UsersView />
      case "products":
        return <ProductsView />
      case "categories":
        return <CategoriesView />
      case "carts":
        return <CartsView />
      case "stores":
        return <StoresView />
      default:
        return <DashboardOverview />
    }
  }

  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard"
      case "orders":
        return "Orders Management"
      case "users":
        return "Users Management"
      case "products":
        return "Products Management"
      case "categories":
        return "Categories Management"
      case "carts":
        return "Carts Management"
      case "stores":
        return "Stores Management"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
