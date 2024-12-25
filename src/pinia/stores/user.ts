import  pinia  from "@/pinia"
import { resetRouter } from "@/router"
import { routerConfig } from "@/router/config"
import { getUserInfoApi } from "@@/apis/user"
import { useSettingsStore } from "./settings"
import { useTagsViewStore } from "./tags-view"
import { id } from "element-plus/es/locales.mjs"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>("")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const userId = ref<string>("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  // 设置 Token
  const setToken = async (value: string) => {
    token.value = value
  }

  // 设置用户id
  const setUserId = async (value: string) => {
    userId.value = value
  }

  // 获取用户详情
  const getInfo = async () => {
    const { data } = await getUserInfoApi({id:userId.value})
    username.value = data.username
    const role = ref<string>("")
    switch (data.role) {
      case 1:
       role.value = "personalStaff"
      case 25:
        role.value = "salaryStaff"
        break
        case 75:
          role.value = "personalStaff"
        break
        case 100:
          role.value = "personalManager"
          break
          default:
          break
    }
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = role.value ? [role.value] : routerConfig.defaultRoles
  }

  // 模拟角色变化
  const changeRoles = async (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    location.reload()
  }

  // 登出
  const logout = () => {
    token.value = ""
    roles.value = []
    userId.value = ""
    resetRouter()
    resetTagsView()
  }

  // 重置 Token
  const resetToken = () => {
    token.value = ""
    roles.value = []
    userId.value = ""
  }

  // 重置 Visited Views 和 Cached Views
  const resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, username, userId, setUserId, setToken, getInfo, changeRoles, logout, resetToken }
}, {
  persist: true
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreOutside() {
  return useUserStore(pinia)
}
