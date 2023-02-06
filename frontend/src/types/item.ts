export type Item = {
  _id?: string;
  info?: {
    name: string;
    pictures?: Array<string>;
    detail?: string;
    requirements?: string;
    take_out: string;
    price: string;
    address: string;
  };
  location?: Array<number>;
  // company_id?: string;
  lender?: {
    company_id: string;
    company_name: string;
    stripe_connected_id: string;
  };
};
