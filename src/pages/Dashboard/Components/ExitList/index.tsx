import { useState } from "react"
import { Box } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useProduct } from "@/hooks/useProduct"

import Image from '@/assets/ImageLoading.svg'

const ITEMS_PER_PAGE = 3


export const ExitList = () => {
  const [page, setPage] = useState(1)

  const { listProducts } = useProduct()

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
              Nenhum movimento encontrado
            </h1>
          </div>
        ) : (
          <>
            <h1 className="font-semibold text-neutral-600">
              Lista de Saídas
            </h1>
       
    
            <div className="flex flex-col gap-3 mt-2">
              <p className="mb-1">Ultimas Saídas</p>
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
