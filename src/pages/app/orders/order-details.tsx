import { OrderStatus } from "@/components/order-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderDetailsSkeleton } from "./order-details-skeleton";

export interface OrderDetailsProps {
  open: boolean
  order: {
    order_id: string;
    created_at: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    price_in_cents: number;
    customer_name: string,
    phone: string | null
    order_items: {
      price_in_cents: number,
      quantity: number,
      name: string
    }[]
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // const { data: order } = useQuery({
  //   queryKey: ['order', orderId],
  //   queryFn: () => getOrderDetails({ orderId }),
  //   enabled: open
  // })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {order.order_id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer_name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Telefone</TableCell>
                <TableCell className="flex justify-end">
                  {order.phone ?? 'Não informado'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Realizado há</TableCell>
                <TableCell className="flex justify-end">
                  { formatDistanceToNow(order.created_at, {
                    locale: ptBR,
                    addSuffix: true
                  }) }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produtos</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.order_items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {(item.price_in_cents / 100).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' }
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {((item.price_in_cents / 100) * item.quantity).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' }
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.price_in_cents / 100).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' }
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  )
}
