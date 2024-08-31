import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { storeProduct } from "@/api/store-product"
import { queryClient } from "@/lib/react-query"
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "@/components/ui/file-uploader"
import { useEffect, useState } from "react"
import { DropzoneOptions } from "react-dropzone"
import { getPresignedUrl } from "@/api/get-presigned-url"
import { uploadCover } from "@/api/upload-cover"

const storeProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  category: z.string(),
  description: z.string().nullable(),
  cover: z.string().nullable(),
})

type storeProductSchema = z.infer<typeof storeProductSchema>

export function ProductForm() {
  const { register, setValue, handleSubmit, reset, formState: { isSubmitting } } = useForm<storeProductSchema>({
    resolver: zodResolver(storeProductSchema),
    defaultValues: {
      cover: "",
      category: "Esfirras",
    }
  })

  const { mutateAsync: getPresignedUrlFn } = useMutation({
    mutationFn: getPresignedUrl,
  })

  const { mutateAsync: uploadCoverFn } = useMutation({
    mutationFn: uploadCover,
  })

  const [files, setFiles] = useState<File[] | null>([]);
  const [urlPost, setUrlPost] = useState<string>("");

  useEffect(() => {
    if (files?.length && files.length > 0) {
      const generatePostUrl = async () => {
        const extension = files[0].name.split('.').pop();
        const uniqueFileName = `${crypto.randomUUID()}.${extension}`
        const post_url = await getPresignedUrlFn({file_name: uniqueFileName, type: files[0].type})
        setUrlPost(post_url)
        setValue("cover", uniqueFileName)
      }
      generatePostUrl()
    }
  }, [files, getPresignedUrlFn, setUrlPost, setValue])
 
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: false,
    // maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const { mutateAsync: storeProductFn } = useMutation({
    mutationFn: storeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  async function handleStoreProduct(data: storeProductSchema) {
    try {
      if (files?.length && files.length > 0) {
        await uploadCoverFn({post_url: urlPost, file: files[0]})

        await storeProductFn({
          name: data.name,
          price_in_cents: data.price,
          description: data.description ?? '',
          category: data.category,
          cover: data.cover ?? '',
        })

        toast.success('Produto criado com sucesso!')
        reset()
        setFiles([])
      }
    } catch {
      toast.error('Falha ao cadastrar o produto, tente novamente!')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Novo produto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo produto</DialogTitle>
          <DialogDescription>
            Adicione novos produtos ao seu estoque
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleStoreProduct)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input id="name" {...register('name')} />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label className="text-right" htmlFor="category">
                Categoria
              </Label>
              <Input id="category" {...register('category')} />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label className="text-right" htmlFor="price">
                Preço em centavos
              </Label>
              <Input id="price" type="number" min={0} {...register('price', {valueAsNumber: true,})} />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label className="text-right" htmlFor="description">
                Descrição
              </Label>
              <Textarea id="description" {...register('description')} />
            </div>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dropzone}
            >
              <FileInput>
                <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                  <p className="text-gray-400">
                    Arraste ou selecione um arquivo
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent className="flex items-center flex-row gap-2">
                {files?.map((file, i) => (
                  <FileUploaderItem
                    key={i}
                    index={i}
                    className="h-20 rounded-md overflow-hidden"
                    aria-roledescription={`file ${i + 1} containing ${file.name}`}
                  >
                    {file.name}
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            </FileUploader>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancelar</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit" variant="success">Cadastrar produto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
