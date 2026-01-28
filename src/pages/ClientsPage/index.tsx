import { useState } from "react"
import { Box, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"


type Item = {
  id: number
  name: string
  unit: string
  quantity: number
}

const ITEMS_PER_PAGE = 4

const mockItems: Item[] = [
  { id: 1, name: "Air Conditioner", unit: "Peças", quantity: 53 },
  { id: 2, name: "Television", unit: "Unidades", quantity: 28 },
  { id: 3, name: "Light", unit: "Unidades", quantity: 15 },
  { id: 4, name: "Cabo Elétrico", unit: "Metros", quantity: 120 },
  { id: 5, name: "Parafuso", unit: "Caixa", quantity: 8 },
]

export const ClientsPage = () => {
  const [page, setPage] = useState(1)

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = mockItems.slice(start, start + ITEMS_PER_PAGE)

  const totalPages = Math.ceil(mockItems.length / ITEMS_PER_PAGE)

  return (
    <section className="w-full min-h-svh flex flex-col gap-4 p-4 bg-neutral-200">
      
      <h1 className="font-semibold text-neutral-600">
       Nossos Clientes
      </h1>

      <div className="flex items-center justify-center gap-3">
        <Input className="bg-neutral-50 py-6 " placeholder="Digite o nome do Produto" />
        <Button className="py-6 w-12 bg-blue-800">
          <Search className="size-6 font-semibold" />
        </Button>
      </div>

        {/* 📦 Lista estilo imagem */}
      <div className="flex flex-col gap-3 mt-2">
        <p className="mb-1">Items Listados</p>
        {paginatedItems.map((item) => (
          <Dialog>
            <DialogTrigger asChild>
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
                      {item.name}
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
            </DialogTrigger>

            <DialogContent>
              <p>Heloo</p>
            </DialogContent>
          </Dialog>
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
    </section>
  )
}
