export type Order = {
  _id?: string;
  userId?: string;
  productId: string;
  productName: string;
  quantity: number;
  creationTimestamp: string;
  zipCode: string;
  streetNumber: number;
  complement?: string;
  totalValue?: number;
};
