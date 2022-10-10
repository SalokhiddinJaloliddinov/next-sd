import { AxiosInstance } from "axios";
import { CreateTicketDto } from "./types";

export const TicketApi = (instance: AxiosInstance) => ({
  async create(dto: CreateTicketDto) {
    const { data } = await instance.post<CreateTicketDto>("/ticket", dto, {});
    return data;
  },
});
