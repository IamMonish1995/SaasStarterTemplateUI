import { POST } from "./baseRequest";

export const createinstance = async (data: any) => await POST(`createinstance`, data);
