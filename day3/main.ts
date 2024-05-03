// @ts-ignore
const input: string = await Bun.file(Bun.argv[2] == 'a' ? "input.txt" : "a.txt").text();

// console.log(input)
const EOL = `
`

const map = input.split(EOL).map(s => s.split(""))
const printMap = (map: string[][]) => console.log(EOL + map.map(s => s.join("")).join(EOL))



const log = <T>(x: T): T => {
  console.log(x)
  return x
}


printMap(map)

let distanceMap = [] as number[][][]

type Dir = [number, number];

const dirs: [Dir, Dir, Dir, Dir] = [
  [Infinity, -1],
  [-1, Infinity],
  [Infinity, 1],
  [1, Infinity],
]

const flag = false;
const distanceToRock = (dir: Dir, row: number, tile: number): number => {
  // Iterate in direction
  // console.log(dir, row, tile)
  let n = 0;
  for (let i = row; i < map.length && i >= 0; i += dir[1]) {
    for (let j = tile; j < map[0].length && j >= 0; j += dir[0]) {
      if (n == 0 ? map[i][j] == "#" : ["#", "O"].includes(map[i][j])) {
        return n - 1;
      }
      n++;
    }
  }
  return n - 1;
}

distanceMap = map.map((_, row) => _.map((_, tile) => dirs.map(dir => (distanceToRock(dir, row, tile)))))

const printDMap = (dir: number) => distanceMap.forEach(row => console.log(row.map(tile => (tile[dir] == -1 ? "-" : tile[dir])).join("")))

printDMap(0)

const sumMap = (map: string[][]) => {
  const total = map.map((row, rowI) => {

    const score = map.length - rowI;
    console.log(row.join(""), "  ", score)
    return row.map((r) => {
      if (r == "O") return score;
      return 0;
    })
  }).flat().reduce((a, v) => a + v, 0)
  console.log(total);
}

sumMap(map)