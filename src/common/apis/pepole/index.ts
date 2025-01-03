import { request } from "@/http/axios"
import {List,audit} from "./type"


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

/** 获取薪酬标准 */
export function getSalaryStandard() {
  return request<List>({
    url: "/select/salaryStandard",
    method: "get",
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

/** 查询待审核档案列表 */
export function getWaitAuditApi() {
  return request<audit>({
    url: "/humanResources/getUnchecked",
    method: "get",
  })
}

/** 查询待审核档案详情 */
export function getAuditApi(data: any) {
  return request<any>({
    url: "/humanResources/getHumanResources",
    method: "get",
    params: data
  })
}

/** 审核档案 */
export function auditApi(data: any) {
  return request<any>({
    url: "/humanResources/pass",
    method: "put",
    params: data
  })
}

/** 查询是否创建档案 */
export function getIsCreateApi(data: any) {
  return request<any>({
    url: "/humanResources/checkUser",
    method: "get",
    params: data
  })
}

/** 更新档案 */
export function updateApi(data: any) {
  return request<any>({
    url: "/humanResources/update",
    method: "put",
    data
  })
}

/** 查询档案 */
export function getApi(data: any) {
  return request<any>({
    url: "/humanResources/getSelect",
    method: "post",
    data
  })
}

/** 获取所有档案 */
export function getAllApi(data?: any) {
  return request<any>({
    url: "/humanResources",
    method: "get",
    params:data
  })
}

/** 删除或恢复档案 */
export function deleteOrRecoveryApi(data: any) {
  return request<any>({
    url: "/humanResources/deleteOrRecovery",
    method: "post",
    data
  })
}

/** 去注册 */
export function registerApi(data: any) {
  return request<any>({
    url: "/login/register",
    method: "post",
    data
  })
}

