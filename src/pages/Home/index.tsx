import { PackagePlus, QrCode, Search, UserRoundPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Home = () => {

  const navigate = useNavigate()
  return (
    <section className="w-full h-svh">
      <div className="p-5 flex flex-col items-start justify-start gap-12">
        <div className="mt-12">
        <p>Bem Vindo!</p>
        <h1 className="text-5xl">
          <span className="text-blue-700 ">Alves Glass</span><br />
          Almoxarifado
        </h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <div className="col-span-1 w-full h-32 p-3 flex flex-col gap-1 items-start rounded-xl shadow bg-neutral-200" onClick={() => navigate('/saida')}>
            <QrCode className="size-13 text-blue-600" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">Saídas</p>
              <p className="text-sm font-semibold text-gray-500 -mt-1">Tirar produtos</p>
            </div>
          </div>

          <div className="col-span-1 w-full h-32 p-3 flex flex-col gap-1 items-start rounded-xl shadow  bg-neutral-200" onClick={() => navigate('/entrada')}>
            <PackagePlus className="size-14 text-blue-600"/>
              <div className="flex flex-col">
              <p className="text-lg font-bold">Entradas</p>
              <p className="text-sm font-semibold text-gray-500 -mt-1">Adicionar produtos</p>
            </div>
          </div>

          <div className="col-span-1 w-full h-32 p-3 flex flex-col gap-1 items-start rounded-xl shadow bg-neutral-200" onClick={() => navigate('/catalogo')}>
            <Search className="size-13 text-blue-600"/>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Catalogo</p>
              <p className="text-sm font-semibold text-gray-500 -mt-1">Lista produtos</p>
            </div>
          </div>

          <div className="col-span-1 w-full h-32 p-3 flex flex-col gap-1 items-start rounded-xl shadow  bg-neutral-200" onClick={() => navigate('/clientes')}>
            <UserRoundPlus className="size-13 text-blue-600"/>
              <div className="flex flex-col">
                <p className="text-lg font-bold">Clientes</p>
                <p className="text-sm font-semibold text-gray-500 -mt-1">Adicionar Cliente</p>
              </div>
          </div>

          <div className="col-span-2 w-full h-32 p-3 flex flex-col gap-1 items-start rounded-xl shadow  bg-neutral-200" onClick={() => navigate('/login')}>
          <UserRoundPlus className="size-13 text-blue-600"/>
            <div className="flex flex-col">
              <p className="text-lg font-bold">Admin</p>
              <p className="text-sm font-semibold text-gray-500 -mt-1">Área do Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


