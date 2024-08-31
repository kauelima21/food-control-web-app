import { getProducts } from "@/api/get-products"
// import { Pagination } from "@/components/pagination"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { ProductTableSkeleton } from "./product-table-skeleton"
import { ProductTableRow } from "./product-table-row"
import { ProductTableFilters } from "./product-table-filters"
import { ProductForm } from "./product-form"


export function Products() {
  // const [searchParams, setSearchParams] = useSearchParams()

  // const orderId = searchParams.get('productId')
  // const productName = searchParams.get('productName')
  // const status = searchParams.get('status')

  // const pageIndex = z.coerce
  //   .number()
  //   .transform(page => page - 1)
  //   .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
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
        <div className="flex items-center justify-between">
          <ProductTableFilters />
          
          <ProductForm />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead>Identificador</TableHead>
                <TableHead className="w-[200px]">Criado há</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[140px]">Preço</TableHead>
                <TableHead className="w-[164px]">Status</TableHead>
                <TableHead className="w-[164px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {isLoading && <ProductTableSkeleton />}

            {result && result.products.map(product => {
              return (
                <ProductTableRow key={product.product_id} product={product} />
              )
            })}
            </TableBody>
          </Table>

          {/* {result && (
            <Pagination
              pageIndex={0}
              totalCount={50}
              perPage={10}
              onPageChange={() => {}}
            />
          )} */}
        </div>
      </div>
    </div>
  )
}
