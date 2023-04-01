import { axiosClassic } from "../Api/Api";
import { TODO_LIST } from "../../Todo_list_types";

export const TaskService = {
  async getAll(): Promise<Task[]> {
    return axiosClassic.get("");
  },

  async getId(id: string) {
    console.log(axiosClassic.get(`/${id}`));

    return axiosClassic.get(`/${id}`);
  },
};

console.log(TaskService.getAll());
