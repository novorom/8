"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { Product } from "@/lib/products-data"
import { products as initialProducts } from "@/lib/products-data"

// Увеличивай эту версию при каждом масштабном обновлении товаров
const PRODUCTS_VERSION = "2025-03"

interface ProductsContextType {
  products: Product[]
  updateProducts: (products: Product[]) => void
  resetProducts: () => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem("admin-products-version")
      const savedProducts = localStorage.getItem("admin-products")

      // Если версия устарела или кол-во товаров в localStorage меньше текущего — сбрасываем
      if (
        savedProducts &&
        savedVersion === PRODUCTS_VERSION
      ) {
        const parsed = JSON.parse(savedProducts)
        // Доп. проверка: берём localStorage только если там не меньше товаров
        if (parsed.length >= initialProducts.length) {
          setProducts(parsed)
        } else {
          localStorage.removeItem("admin-products")
          localStorage.removeItem("admin-products-version")
        }
      } else {
        // Устаревшая версия — чистим
        localStorage.removeItem("admin-products")
        localStorage.removeItem("admin-products-version")
      }
    } catch (error) {
      console.error("[products-context] Failed to parse saved products:", error)
      localStorage.removeItem("admin-products")
    }
  }, [])

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem("admin-products", JSON.stringify(newProducts))
    localStorage.setItem("admin-products-version", PRODUCTS_VERSION)
  }

  const resetProducts = () => {
    setProducts(initialProducts)
    localStorage.removeItem("admin-products")
    localStorage.removeItem("admin-products-version")
  }

  return (
    <ProductsContext.Provider value={{ products, updateProducts, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    return {
      products: initialProducts,
      updateProducts: () => {},
      resetProducts: () => {},
    }
  }
  return context
}
