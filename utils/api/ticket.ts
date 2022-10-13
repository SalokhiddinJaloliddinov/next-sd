import { AxiosInstance } from "axios";
import { CreatePublicLogDto, CreateTicketDto, SingleTicket } from "./types";

interface filter {
  search: string;
  page: number;
  limit: number;
}

export const TicketApi = (instance: AxiosInstance) => ({
  async create(dto: CreateTicketDto) {
    const { data } = await instance.post("/ticket", dto, {});
    return data;
  },

  async getAll(filter: filter) {
    const { data } = await instance.get(
      `/ticket/incident?page=${filter.page ? filter.page : ""}&limit=${
        filter.limit ? filter.limit : ""
      }&search=${filter.search ? filter.search : ""}`
    );
    return data;
  },

  async getOne(id: number, finalclass: string) {
    const { data } = await instance.get<SingleTicket>(
      `/ticket/${finalclass}/${id}`
    );
    return data;
  },

  async getPublicLog(id: number, finalclass: string) {
    const { data } = await instance.get(
      `ticket/${finalclass}/${id}/public-log`
    );
    return data;
  },

  async createPublicLog(dto: CreatePublicLogDto) {
    const { data } = await instance.post("/ticket/public-log", dto);
    return data;
  },
});
