export type ProductStatus = 'active' | 'inactive'

interface ProductStatusProps {
  status: ProductStatus
}

const productStatusMap: Record<ProductStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
}

export function ProductStatus({ status }: ProductStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'inactive' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {status === 'active' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        { productStatusMap[status] }
      </span>
    </div>
  )
}
