import type React from "react"
import { MainLayout } from "../../landing/components/layout"
import Cart from "../components/Cart"

const CartPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="pt-8 pb-16 bg-gray-50 min-h-screen">
        <Cart />
      </div>
    </MainLayout>
  )
}

export default CartPage

