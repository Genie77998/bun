export const rondomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min

export const randomName = (prefix = '') => {
  const randomLength = rondomNumber(5, 12)
  let nameArr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  ]
  let name = prefix
  for (let i = 0; i < randomLength; i++) {
    let index = Math.floor(Math.random() * 2)
    let zm = nameArr[index][Math.floor(Math.random() * nameArr[index].length)]

    if (index === 1) {
      if (Math.floor(Math.random() * 2) === 1) {
        zm = zm.toUpperCase()
      }
    }
    name += zm
  }
  return name
}
