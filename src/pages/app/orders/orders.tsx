import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
// import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {
  // const [searchParams, setSearchParams] = useSearchParams()

  // const orderId = searchParams.get('orderId')
  // const customerName = searchParams.get('customerName')
  // const status = searchParams.get('status')

  // const pageIndex = z.coerce
  //   .number()
  //   .transform(page => page - 1)
  //   .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    staleTime: Infinity,
  })

  // function handlePagination(pageIndex: number) {
  //   setSearchParams(state => {
  //     state.set('page', (pageIndex + 1).toString())
  //     return state
  //   })
  // }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[200px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <OrderTableSkeleton />}

              {result && result.orders.map(order => {
                return (
                  <OrderTableRow key={order.order_id} order={order} />
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* {result && (
          <Pagination
            pageIndex={result.meta.pageIndex}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
            onPageChange={handlePagination}
          />
        )} */}
      </div>
    </div>
  )
}
