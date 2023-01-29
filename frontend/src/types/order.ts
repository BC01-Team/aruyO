export type Order = {
  _id?: string
  items_copy?: {
    _id: string,
    name: string,
    picture: string,
    detail: string,
    requirements: string,
    take_out: string,
    price: string,
    address: string
  },
  period?: {
    start: string,
    end: string
  },
  payment?: {
    total: string,
    method: string,
    status: string
  },
  lender?: {
    _id: string,
    evaluation: string
  },
  borrower?: {
    _id: string,
    evaluation: string
  }
};