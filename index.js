const express = require("express"); // импортировать экспресс
const path = require("path");
const fs = require("fs");
let danus = "0";
const app = express(); // создать серверное приложение
const DJ_en = 6003;
const freq = () => ({
  125: {},
  250: {},
  500: {},
  1000: {},
  2000: {},
  4000: {},
  6000: {},
  8000: {},
});
const pinus = () => ({
  air: { right: freq(), left: freq() },
  bone: { right: freq(), left: freq() },
});

fs.readFile("./data/sus.csv", (err, data) => {
  if (err) throw err;
  jojos(data.toString());
});
app.get("/", (req, res) => {
  res.send(danus);
});

function tretiyClass(asus) {
  return ((asus[3].length - 1) / 4).toString();
  //return ((45 - 1) / 4).toString();
}

function jojos(rarus) {
  let splitus = rarus.split("\r\n").map((str) => str.split(";"));
  splitus = splitus.slice(3, 11);
  const pacientsus = tretiyClass(splitus);
  const results = [];
  for (let i = 1; i <= pacientsus; i++) {
    results.push(pinus());
    const massivus = [125, 250, 500, 1000, 2000, 4000, 6000, 8000];
    for (let frequency_index in massivus) {
      let air_right = abobuss(splitus, frequency_index, i, "air", "right");
      let air_left = abobuss(splitus, frequency_index, i, "air", "left");
      let bone_right = abobuss(splitus, frequency_index, i, "bone", "right");
      let bone_left = abobuss(splitus, frequency_index, i, "bone", "left");
      if (air_right != "")
        results[i - 1].air.right[massivus[frequency_index]] = {
          [air_right]: [1],
        };
      if (bone_right != "")
        results[i - 1].bone.right[massivus[frequency_index]] = {
          [bone_right]: [1],
        };
      if (air_left != "")
        results[i - 1].air.left[massivus[frequency_index]] = {
          [air_left]: [1],
        };
      if (bone_left != "")
        results[i - 1].bone.left[massivus[frequency_index]] = {
          [bone_left]: [1],
        };
    }
  }
  danus = {
    gg: splitus[0][1],
    abobuss: abobuss(splitus, 5, 11, "bone", "right"),
    splitus,
    results,
  };

  //danus = pinus;
  console.log(Object.keys(results[0].bone.right[125]));
  //console.log(results[0].bone.right);
}

function abobuss(koyka, num, nomerus, typus, storona) {
  //typus = "air" or "bone"
  const kaska = tretiyClass(koyka);
  const offtypus = typus == "bone" ? 2 : 0;
  const offstoronus = storona == "right" ? 0 : 1;
  //const offset = (условие) ? значениеприда : значениепринет

  return koyka[num][4 * (nomerus - 1) + 1 + offtypus + offstoronus];
}

//abobuss(splitus, stroka, nomer_patienta, vozduh_ili_cost, RorL);
//abobuss(splitus, 3, 2, 'air', 'R');

app.listen(DJ_en);
