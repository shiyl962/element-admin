import axios from "@/utils/axios";

export function getMenuList() {
  return axios.get("/applet/jsons/caihai.json");
}
