const west = (map: any) => {
  map.forEach((row, rowI) => {
    row.forEach((rocc, roccI) => {

      if (rocc != "O") {
        return;
      }

      let newI = 0;
      for (let i = roccI - 1; i >= 0; i--) {
        if (["#", "O"].includes(map[rowI][i])) {
          newI = i + 1;
          break;
        }
      }
      map[rowI][roccI] = ".";
      map[rowI][newI] = "O";
    });
  });
};
const north = (map: any) => {
  map.forEach((row, rowI) => {
    row.forEach((rocc, roccI) => {

      if (rocc != "O") {
        return;
      }
      if (rowI == 0) {
        return;
      }

      let newI = 0;
      for (let i = rowI - 1; i >= 0; i--) {
        if (["#", "O"].includes(map[i][roccI])) {
          newI = i + 1;
          break;
        }
      }
      map[rowI][roccI] = ".";
      map[newI][roccI] = "O";

    });
  });
};
const south = (map: any) => {
  for (let rowI = map.length - 1; rowI >= 0; rowI--) {
    const row = map[rowI];
    row.forEach((rocc, roccI) => {
      if (rocc != "O") {
        return;
      }

      let newI = map.length - 1;
      for (let i = rowI + 1; i < map.length; i++) {
        if (["#", "O"].includes(map[i][roccI])) {
          newI = i - 1;
          break;
        }
      }
      map[rowI][roccI] = ".";
      map[newI][roccI] = "O";
    });
  }
};
const east = (map: any) => {
  map.forEach((row, rowI) => {
    for (let roccI = (row.length - 1); roccI >= 0; roccI--) {
      const rocc = row[roccI];
      if (rocc != "O") {
        continue;
      }

      let newI = row.length - 1;
      for (let i = roccI + 1; i < row.length; i++) {
        if (["#", "O"].includes(map[rowI][i])) {
          newI = i - 1;
          break;
        }
      }
      map[rowI][roccI] = ".";
      map[rowI][newI] = "O";
    }
  });
};
