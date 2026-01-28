import { useState } from "react"
import { Box, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { useProduct } from "@/hooks/useProduct"

import Image from '@/assets/ImageLoading.svg'

const ITEMS_PER_PAGE = 3


export const Catalog = () => {
  const [page, setPage] = useState(1)

  const { listProducts, listCategories } = useProduct()

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = listProducts.slice(start, start + ITEMS_PER_PAGE)

  const totalPages = Math.ceil(listProducts.length / ITEMS_PER_PAGE)

  return (
    <section className="w-full min-h-svh flex flex-col justify-center gap-4 p-4 bg-neutral-200">
      {
        listProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <img className="w-60" src={Image} alt="" />
            <h1 className="font-semibold text-center text-neutral-600">
              Ops <br />
              Nenhum produto encontrado no catalogo
            </h1>
          </div>
        ) : (
          <>
            <h1 className="font-semibold text-neutral-600">
              Nosso Catalogo
            </h1>
       
            {/* 🔄 Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {
                  listCategories.map((category) => (
                    <CarouselItem key={category.id} className="basis-1/2">
                      <div className="h-20 bg-neutral-50 rounded-md shadow flex items-center justify-center">
                        {category.name}
                      </div>
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
            </Carousel>

            <div className="flex items-center justify-center gap-3 mt-5">
              <Input className="bg-neutral-50 py-6 " placeholder="Digite o nome do Produto" />
              <Button className="py-6 w-12 bg-blue-800">
                <Search className="size-6 font-semibold" />
              </Button>
            </div>

            {/* 📦 Lista estilo imagem */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="mb-1">Items Listados</p>
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Box className="text-blue-800" />
                    </div>
      
                    <div>
                      <p className="font-semibold text-sm">
                        {item.item_name}
                      </p>
                      <span className="text-xs text-neutral-400">
                        {item.unit}
                      </span>
                    </div>
                  </div>
      
                  <span className="text-blue-800 font-bold text-xl">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
      
            {/* ⏮️ Paginação */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>
      
              <span className="text-sm text-neutral-500">
                Página {page} de {totalPages}
              </span>
      
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Próximo
              </Button>
            </div>
    
          </>
        )
      }
      
    </section>
  )
}
