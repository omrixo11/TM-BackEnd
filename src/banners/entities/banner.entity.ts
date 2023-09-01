
import { ObjectId } from "mongodb"

export class Banner {
  name: string
  description: string
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
