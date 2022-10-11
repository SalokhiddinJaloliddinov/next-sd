import { LoginDto, ResponseLogin } from "./types";
import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseLogin[]>("/contact/person");
    return data;
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseLogin }>(
      "/auth/",
      dto
    );
    return data;
  },
  async getMe() {
    const { data } = await instance.get<ResponseLogin>("/auth/profile");
    return data;
  },
});
