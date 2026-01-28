import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Focus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProduct";
import api from "@/Services/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


// eslint-disable-next-line react-refresh/only-export-components
export const exitSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, "Quantidade mínima é 1"),
  withdrawn_by: z.string().min(2, "Informe quem está retirando"),
});

interface Item {
  id: string;
  item_name: string;
  quantity: number;
  unit: string;
}

export const ExitProduct = () => {
  const { handleCreateStockMovement } = useProduct();

  const [scanning, setScanning] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(exitSchema),
    defaultValues: {
      quantity: 1,
      withdrawn_by: "",
    },
  });

  // ================= QR CODE =================
useEffect(() => {
  if (!scanning) return;

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode
    .start(
      { facingMode: "environment" }, // câmera traseira
      {
        fps: 10,
        qrbox: 250,
      },
      async (decodedText) => {
        await html5QrCode.stop();
        html5QrCode.clear();
        setScanning(false);

        try {
          const response = await api.get(`/items/code/${decodedText}`);
          setItem(response.data);
        } catch {
          alert("Item não encontrado");
        }
      },
      (error) => {
        console.error("QR Code error:", error);
      }
    )
    .catch(() => {
      alert("Não foi possível acessar a câmera");
      setScanning(false);
    });

  return () => {
    html5QrCode.stop().catch(() => {});
  };
}, [scanning]);


  // ================= SUBMIT =================
  const onSubmit = async (data: z.infer<typeof exitSchema>) => {
    if (!item) return;

    if (data.quantity > item.quantity) {
      alert("Quantidade maior que o estoque disponível");
      return;
    }

    await handleCreateStockMovement({
      item_id: item.id,
      movement_type: "OUT",
      quantity: data.quantity,
      withdrawn_by: data.withdrawn_by,
    });

    reset();
    setItem(null);
  };

  // ================= SCANNER =================
  if (scanning) {
    return (
      <section className="w-full h-svh flex flex-col items-center justify-center gap-4">
        <div id="reader" className="w-72" />
        <Button variant="outline" onClick={() => setScanning(false)}>
          Cancelar
        </Button>
      </section>
    );
  }

  // ================= FORM =================
  if (item) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-svh flex flex-col justify-center gap-4 p-6"
      >
        <h2 className="text-xl font-semibold">{item.item_name}</h2>

        <p className="text-sm text-muted-foreground">
          Estoque disponível: {item.quantity} {item.unit}
        </p>

        <input
          type="number"
          min={1}
          max={item.quantity}
          {...register("quantity")}
          className="border p-3 rounded"
          placeholder="Quantidade"
        />
        {errors.quantity && (
          <p className="text-xs text-red-500">
            {errors.quantity.message}
          </p>
        )}

        <input
          {...register("withdrawn_by")}
          className="border p-3 rounded"
          placeholder="Quem está retirando"
        />
        {errors.withdrawn_by && (
          <p className="text-xs text-red-500">
            {errors.withdrawn_by.message}
          </p>
        )}

        <Button type="submit" className="bg-neutral-700">
          Confirmar Saída
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setItem(null)}
        >
          Voltar
        </Button>
      </form>
    );
  }

  // ================= HOME =================
  return (
    <section className="w-full h-svh flex flex-col items-center justify-center gap-3">
      <Focus className="size-32 text-neutral-500" />
      <Button
        className="p-6 text-lg font-semibold bg-neutral-500"
        onClick={() => setScanning(true)}
      >
        Buscar Item
      </Button>
    </section>
  );
};
