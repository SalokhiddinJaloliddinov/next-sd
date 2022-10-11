export type ResponseLogin = {
  access_token: string;
  contactid: number;
  person_friendlyname: string;
  id: number;
  login: string;
  status: string;
};

export type LoginDto = {
  login: string;
  password: string;
};

// Ticket

export type CreateTicketDto = {
  title: string;
  description: string;
  caller_id: number;
  class: string;
};

export type TicketList = {
  id: number;
  ref: string;
  title: string;
  servicesubcategory_name: string;
  last_update: string;
  caller_id_friendlyname: string;
  status: string;
  finalclass: string;
};
