// 统一处理 Cookie

import { CacheKey } from "@@/constants/cache-key"
import Cookies from "js-cookie"
import {useUserStore} from "../../../pinia/stores/user"

export function getToken() {
  return useUserStore().token
}
