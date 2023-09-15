import { randomName, rondomNumber } from '../utils'

export default (length = 10) => {
  const now = Date.now()
  return Array.from(Array(length).keys()).map((_, index) => ({
    userName: randomName(),
    age: rondomNumber(18, 55),
    sex: ["男", "女"][rondomNumber(0, 1)],
    id: (now + index).toString(36)
  }))
}
