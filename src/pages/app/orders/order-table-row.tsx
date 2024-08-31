import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";

export interface OrderTableRowProps {
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

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  // const queryClient = useQueryClient()

  // function updateOrderStatusOnCache(order_id: string, status: OrderStatus) {
  //   const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
  //     queryKey: ['orders'],
  //   })

  //   ordersListCache.forEach(([cacheKey, cacheData]) => {
  //     if (!cacheData) return

  //     queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
  //       ...cacheData,
  //       orders: cacheData.orders.map(order => {
  //         if (order.order_id === order_id) {
  //           return { ...order, status }
  //         }

  //         return order
  //       })
  //     })
  //   })
  // }

  // const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
  //   mutationFn: cancelOrder,
  //   async onSuccess(_, { order_id }) {
  //     updateOrderStatusOnCache(order_id, 'canceled')
  //   }
  // })

  // const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
  //   mutationFn: approveOrder,
  //   async onSuccess(_, { order_id }) {
  //     updateOrderStatusOnCache(order_id, 'processing')
  //   }
  // })

  // const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
  //   mutationFn: dispatchOrder,
  //   async onSuccess(_, { order_id }) {
  //     updateOrderStatusOnCache(order_id, 'delivering')
  //   }
  // })

  // const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
  //   mutationFn: deliverOrder,
  //   async onSuccess(_, { order_id }) {
  //     updateOrderStatusOnCache(order_id, 'delivered')
  //   }
  // })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails order={order} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        { order.order_id }
      </TableCell>
      <TableCell className="text-muted-foreground">
        { formatDistanceToNow(order.created_at, {
          locale: ptBR,
          addSuffix: true
        }) }
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">
        { order.customer_name }
      </TableCell>
      <TableCell className="font-medium">
        { (order.price_in_cents / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }
      </TableCell>
      <TableCell>
        {order.status == 'pending' && (
          <Button
            // onClick={() => approveOrderFn({ order_id: order.order_id })}
            // disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {order.status == 'processing' && (
          <Button
            // onClick={() => dispatchOrderFn({ order_id: order.order_id })}
            // disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}
        {order.status == 'delivering' && (
          <Button
            // onClick={() => deliverOrderFn({ order_id: order.order_id })}
            // disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          // disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
          // onClick={() => cancelOrderFn({ order_id: order.order_id })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
