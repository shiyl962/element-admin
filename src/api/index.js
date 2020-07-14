import axios from "./interceptors";

export function getMenuList() {
  return axios.get("/applet/jsons/caihai.json");
}
