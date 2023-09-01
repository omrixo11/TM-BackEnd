import { ObjectId } from "mongodb"

export class Product {
  name: string
  description: string
  price: number
  currency: string
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
