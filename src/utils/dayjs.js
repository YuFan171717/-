// 配置时间 yarn add dayjs
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')

// 引入中文格式
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
// 使用中文
dayjs.locale('zh-cn')

export default dayjs
