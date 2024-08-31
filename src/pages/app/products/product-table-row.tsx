import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight } from "lucide-react";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { ProductStatus } from "@/components/product-status";
import { ProductDetails } from "./product-details";

export interface ProductTableRowProps {
  product: {
    product_id: string;
    created_at: string;
    status: "active" | "inactive";
    name: string;
    price_in_cents: number;
  }
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const [isProductOpen, setIsProductOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isProductOpen} onOpenChange={setIsProductOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do produto</span>
            </Button>
          </DialogTrigger>
          <ProductDetails open={isProductOpen} product={product} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        { product.product_id }
      </TableCell>
      <TableCell className="text-muted-foreground">
        { formatDistanceToNow(product.created_at, {
          locale: ptBR,
          addSuffix: true
        }) }
      </TableCell>
      <TableCell className="font-medium">
        { product.name }
      </TableCell>
      <TableCell className="font-medium">
        { (product.price_in_cents / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }
      </TableCell>
      <TableCell>
        <ProductStatus status={product.status} />
      </TableCell>
      <TableCell>
        {product.status == 'active' && (
          <Button
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Desativar
          </Button>
        )}
        {product.status == 'inactive' && (
          <Button
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Ativar
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
