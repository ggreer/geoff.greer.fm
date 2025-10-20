"use strict";

const countElem = document.getElementById("count");
const startYearInput = document.getElementById("start_year");
const endYearInput = document.getElementById("end_year");
const mostPopularElem = document.getElementById("most_popular");
const mostPopularCheckElem = document.getElementById("most_popular_check");
const leastPopularElem = document.getElementById("least_popular");
const leastPopularCheckElem = document.getElementById("least_popular_check");
const filterElem = document.getElementById("filter");
const resultsElem = document.getElementById("results");
const sexElem = document.getElementById("sex");

function processNameData(names, startYear, endYear, filters) {
  const candidateNames = {};
  for (const [name, yearRanks] of Object.entries(names)) {
    if (filters.badNames.includes(name)) {
      continue;
    }
    if (filters.name && !name.toLowerCase().startsWith(filters.name)) {
      // console.log(`skipping ${name} because filter ${filter} doesn't match`);
      continue;
    }
    const filteredYearRanks = yearRanks.slice(startYear-1880, endYear-1880);
    filteredYearRanks.forEach(function (rank) {
      if (rank === 0) {
        return;
      }

      if (!candidateNames[name]) {
        candidateNames[name] = {
          min: -Infinity,
          max: Infinity,
        };
      }
      const candidateName = candidateNames[name];

      if (candidateName.min < rank) {
        candidateName.min = rank;
      }
      if (candidateName.max > rank) {
        candidateName.max = rank;
      }
    });
  }
  return candidateNames;
}

function filterNames() {
  const startYear = parseInt(startYearInput.value);
  const endYear = parseInt(endYearInput.value);
  const filter = filterElem.value.toLowerCase();
  const mostPopular = parseInt(mostPopularElem.value);
  const leastPopular = parseInt(leastPopularElem.value);
  const mostPopularCheck = mostPopularCheckElem.checked;
  const leastPopularCheck = leastPopularCheckElem.checked;
  const sex = sexElem.value;
  console.log(
    "filtering names",
    startYear,
    endYear,
    filter,
    mostPopular,
    mostPopularCheck,
    leastPopular,
    leastPopularCheck,
    sex,
  );

  const allCandidateNames = {
    M: {},
    F: {},
  };

  // compact data json format:
  // {"M":{"John":[1, 1, 2, ...]}}

  const filters = {
    name: filter,
    badNames: [],
  };
  if (mostPopularCheck) {
    filters.mostPopular = mostPopular;
  }
  if (leastPopularCheck) {
    filters.leastPopular = leastPopular;
  }

  if (sex) {
    allCandidateNames[sex] = processNameData(compactNameData[sex], startYear, endYear, filters);
  } else {
    allCandidateNames["M"] = processNameData(compactNameData["M"], startYear, endYear, filters);
    allCandidateNames["F"] = processNameData(compactNameData["F"], startYear, endYear, filters);
  }

  const names = [];

  // TODO: add bad names filter.
  const badNames = [];
  for (const [sexKey, candidateNames] of Object.entries(allCandidateNames)) {
    if (sex && sexKey !== sex) {
      // console.log(`skipping ${sexKey} because sex doesn't match ${sex}`)
      continue;
    }
    for (const [name, ranking] of Object.entries(candidateNames)) {
      if (mostPopularCheck && mostPopular > 0 && ranking.max < mostPopular) {
        // console.log(`skipping ${name} because ranking ${ranking.max} is too popular ${mostPopular}`)
        continue;
      }
      if (leastPopularCheck && leastPopular > 0 && ranking.min > leastPopular) {
        // console.log(`skipping ${name} because ranking ${ranking.min} is not popular enough ${leastPopular}`)
        continue;
      }
      names.push({
        name: name,
        sex: sexKey,
        min: ranking.min,
        max: ranking.max,
      });
    }
  }
  setCount(Object.keys(names).length);
  setResults(names);
}

function setResults(names) {
  names.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name === b.name) {
      return 0;
    }
    return 1;
  });
  let tableBody = "";
  names.forEach(function (name) {
    tableBody += `<tr>
      <td style="min-width: 100px;">${name.name}</td>
      <td style="min-width: 24px;">${name.sex}</td>
      <td>${name.max}</td>
      <td>${name.min}</td>
    </tr>`;
  });
  resultsElem.innerHTML = `<table>
  <thead>
    <th>Name</th>
    <th></th>
    <th>Max rank</th>
    <th>Min rank</th>
  </thead>
  <tbody>
    ${tableBody}
  </tbody>
</table>`;
}

function setCount(count) {
  countElem.innerHTML = count;
}

filterNames();

const allElems = [
  countElem,
  startYearInput,
  endYearInput,
  mostPopularElem,
  mostPopularCheckElem,
  leastPopularElem,
  leastPopularCheckElem,
  filterElem,
  sexElem,
]

allElems.forEach(function (elem) {
  elem.onchange = filterNames;
});
