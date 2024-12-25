import type * as Login from "./type"
import { request } from "@/http/axios"


/** 获取当前登陆用户详情 */
export function getUserInfoApi(data: Login.idType) {
  return request<Login.UserInfoResponseData>({
    url: "/users/info",
    method: "post",
    data
  })
}
