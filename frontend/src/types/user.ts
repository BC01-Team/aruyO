export type User = {
  _id?: string;
  info: {
    name: string;
    Japan_Corporate_Number?: string;
    address: string;
    hp_url?: string;
    location?: Array<number>;
    phone: string;
    email: string;
    account?: string;
  };
  staff: [
    {
      id: string;
      name: string;
      email?: string;
      password: string;
      role: { admin: "1"; item: "1"; reservation: "1" };
    }
  ];
  items_id?: Array<string>;
  borrower_history?: Array<string>;
  reservations_history?: Array<string>;
};
