import { Outlet } from "react-router-dom";
import { Pizza } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 font-medium text-foreground">
          <Pizza className="w-5 h-5" />
          <span className="font-semibold">food.control</span>
        </div>
        <footer className="text-sm">
          Painel do parceiro &copy; food.control - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}
