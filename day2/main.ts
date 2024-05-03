const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
const EOL = `
`

// @ts-ignore
const input: string = Bun.argv[2] == 'a' ? await Bun.file("a.txt").text() : test;

const log = <T>(x: T): T => {
  console.log(x)
  return x
}

type Color = {
  red: number
  blue: number
  green: number
}
const games = input.split(EOL).map((game, i) => {
  const gameId = i + 1
  const rounds = game.split(": ")[1].split("; ")
  return rounds
    .map(round => {
      const colors = round.split(', ').map(color => {
        const [n, c] = color.split(" ");
        return [c, parseInt(n)]
      })

      const c = Object.fromEntries(colors) as Color
      return c
    })
    .reduce((acc, v) => {
      return {
        red: Math.max(acc.red, v.red ?? 0),
        blue: Math.max(acc.blue, v.blue ?? 0),
        green: Math.max(acc.green, v.green ?? 0),
      }
    }, { red: 0, green: 0, blue: 0 } as Color)
})
  // .map(log)
  .reduce((acc, v: Color, i) => {
    if (v.red <= 12 && v.green <= 13 && v.blue <= 14) {
      acc += i
    }
    return acc
  }, 0)



let sum = 0;
const x = input.split(EOL).map((game, i) => {
  const gameId = i + 1
  let rounds: string = game.replaceAll("; ", ", ")
  let r = rounds.split(", ").map((round, i) => {
    let [nn, c] = round.split(" ");
    let n = Number(nn);
    if (c == "red" && n > 12) {
      return false
    }
    if (c == "green" && n > 13) {
      return false
    }
    if (c == "blue" && n > 14) {
      return false;
    }
    return true
  }).reduce((a, v) => a && v, true)
  if (r) {
    sum += i + 1
  }
})

console.log(sum)