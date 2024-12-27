import { request } from "@/http/axios"
import {List} from "./type"

/** 获取一级机构 */
export function getPrimaryStructure() {
  return request<List>({
    url: "/select/primaryStructure",
    method: "get",
  })
}

/** 获取二级机构 */
export function getSecondaryStructure() {
  return request<List>({
    url: "/select/secondaryStructure",
    method: "get",
  })
}

/** 获取三级机构 */
export function getThirdStructure() {
  return request<List>({
    url: "/select/tertiaryStructure",
    method: "get",
  })
}

/** 获取职称分类 */
export function getJobCategory() {
  return request<List>({
    url: "/select/getJobCategory",
    method: "get",
  })
}

/** 获取职称名称 */
export function getJobName() {
  return request<List>({
    url: "/select/jobName",
    method: "get",
  })
}

/** 创建人力资源 */
export function createHumanResources(data: any) {
  return request<List>({
    url: "/humanResources/create",
    method: "post",
    data
  })
}


/** 上传图片 */
export function uploadImage(data: any) {
  return request<List>({
    url: "/humanResources/upload",
    method: "post",
    data
  })
}
