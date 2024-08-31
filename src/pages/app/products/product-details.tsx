import { ProductStatus } from "@/components/product-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ProductDetailsSkeleton } from "./product-details-skeleton";

export interface ProductDetailsProps {
  open: boolean
  product: {
    product_id: string;
    name: string;
    created_at: string;
    status: "active" | "inactive";
    price_in_cents: number;
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  // const { data: product } = useQuery({
  //   queryKey: ['product', productId],
  //   queryFn: () => getProductDetails({ productId }),
  //   enabled: open
  // })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Produto: {product.name}</DialogTitle>
        <DialogDescription>Detalhes do produto</DialogDescription>
      </DialogHeader>

      {product ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">ID</TableCell>
                <TableCell className="flex justify-end">
                  {product.product_id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <ProductStatus status={product.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Preço</TableCell>
                <TableCell className="flex justify-end">
                    {((product.price_in_cents / 100)).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' }
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Criado em</TableCell>
                <TableCell className="flex justify-end">
                  { formatDistanceToNow(product.created_at, {
                    locale: ptBR,
                    addSuffix: true
                  }) }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </DialogContent>
  )
}
