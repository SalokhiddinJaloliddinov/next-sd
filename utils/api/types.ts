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

export type UserData = {
  login: string;
  user_id: number;
  contact_id: number;
  person_friendlyname: string;
  status: string;
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
  caller_id_friendlyname: string;
  caller_id: number;
  status: string;
  finalclass: string;
  start_date: string;
};

export type SingleTicket = {
  id: number;
  ref: string;
  title: string;
  description: string;
  caller_id_friendlyname: string;
  caller_id: number;
  agent_id_friendlyname: string;
  agent_id: number;
  team_id_friendlyname: string;
  team_id: number;
  service_id: number;
  service_name: string;
  servicesubcategory_id: number;
  servicesubcategory_name: string;
  status: string;
  finalclass: string;
  last_update: string;
  start_date: string;
  assignment_date: string;
  resolution_date: string;
  last_pending_date: string;
  close_date: string;
  reassign_reason: string;
  dispatch_reason: string;
  pending_reason: string;
  correction_reason: string;
  escalation_reason: string;
};

export type PublicLog = {
  date: string;
  user_login: string;
  user_id: string;
  message: string;
};

export type CreatePublicLogDto = {
  key: number;
  finalclass: string;
  message: string;
};
