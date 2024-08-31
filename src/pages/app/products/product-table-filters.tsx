import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const productFiltersSchema = z.object({
  productId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>

export function ProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const productId = searchParams.get('productId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: {
      productId: productId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all'
    }
  })

  function handleFilter({productId, customerName, status}: ProductFiltersSchema) {
    setSearchParams(state => {
      if (productId) {
        state.set('productId', productId)
      } else {
        state.delete('productId')
      }
      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }
      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')
      return state
    })
  }

  function handleClearFilters() {
    setSearchParams(state => {
      state.delete('productId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')
      return state
    })

    reset({
      productId: '',
      customerName: '',
      status: 'all'
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do produto" className="h-8 w-auto" {...register('productId')} />
      <Input placeholder="Nome do produto" className="h-8 w-[320px]" {...register('customerName')} />
      <Controller
        name="status"
        control={control}
        render={({field: {name, onChange, value, disabled}}) => (
          <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Ativo</SelectItem>
              <SelectItem value="canceled">Inativo</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 w-4 h-4" />
        Filtrar resultados
      </Button>

      <Button onClick={handleClearFilters} type="button" variant="outline" size="xs">
        <X className="mr-2 w-4 h-4" />
        Remover filtros
      </Button>
    </form>
  )
}
