import { AxiosInstance } from "axios";
import { CreateTicketDto } from "./types";

interface filter {
  search: string;
  page: number;
  limit: number;
}

export const TicketApi = (instance: AxiosInstance) => ({
  async create(dto: CreateTicketDto) {
    const { data } = await instance.post<CreateTicketDto>("/ticket", dto, {});
    return data;
  },

  async getAll(filter: filter) {
    const { data } = await instance.get(
      `/ticket/user-request?page=${filter.page ? filter.page : ""}&limit=${
        filter.limit ? filter.limit : ""
      }&search=${filter.search ? filter.search : ""}`
    );
    return data;
  },

  async getOneDelivery(id: number) {
    const { data } = await instance.get(`/ticket/delivery-request/${id}`);
    return data;
  },
  async getOneIncident(id: number) {
    const { data } = await instance.get(`/ticket/incident/${id}`);
    return data;
  },
  async getOneRequest(id: number) {
    const { data } = await instance.get(`/ticket/user-request/${id}`);
    return data;
  },
});
