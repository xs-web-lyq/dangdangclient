import request from "@/utils/axiosUtil";

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getFirstCtgyList() {
    return request.get("/ctgymodule/findFirstCtgys", false);
  }
  getSecThrdCtgyList(firstCtgyId: number) {
    return request.get(`/ctgymodule/findSecThrdCtgys/${firstCtgyId}`, false);
  }
}
export default CtgyAPI.api;
