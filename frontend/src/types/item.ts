export type Item = {
  _id?: string,
  info?: {
    name: string,
    picture: Array<string>,
    detail: string,
    requirements: string,
    take_out: string,
    price: string,
    address: string
  },
  location?: Array<number>, // 型 要確認
  company_id?: string
};