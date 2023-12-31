export class CreateProductDto {
    id : string 
    name: string
  description: string
  price: number
  promo : boolean
  promoprice : number
  category: string
  subCategory: string
  brand: string
  tags: [string]
  imageUrls: [string]
  createdAt: Date
  updatedAt: Date
}
