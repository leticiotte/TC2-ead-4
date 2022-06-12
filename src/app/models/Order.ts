export type Order = {
  _id?: string,
  productId: string,
  productName: string,
  quantity: number,
  date: string,
  zipCode: string,
  streetNumber: number,
  complement?: string,
  totalValue?: number
}
