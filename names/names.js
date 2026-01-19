"use strict";

const countElem = document.getElementById("count");
const startYearInput = document.getElementById("start_year");
const endYearInput = document.getElementById("end_year");
const wasPopularElem = document.getElementById("was_popular");
const wasPopularCheckElem = document.getElementById("was_popular_check");
const mostPopularElem = document.getElementById("most_popular");
const mostPopularCheckElem = document.getElementById("most_popular_check");
const leastPopularElem = document.getElementById("least_popular");
const leastPopularCheckElem = document.getElementById("least_popular_check");
const startsWithElem = document.getElementById("filter_start");
const containsElem = document.getElementById("filter_contains");
const endsWithElem = document.getElementById("filter_end");
const resultsElem = document.getElementById("results");
const sexElem = document.getElementById("sex");

const maxResults = 10000;


const sep = '.';
// Convert all state to hash in url.
function makeHash(fs) {
  var hash = `${fs.startYear}${sep}${fs.endYear}${sep}${fs.sex}${sep}`;
  hash += `${fs.wasPopular}${sep}`;
  hash += `${fs.wasPopularCheck}${sep}`;
  hash += `${fs.mostPopular}${sep}`;
  hash += `${fs.mostPopularCheck}${sep}`;
  hash += `${fs.leastPopular}${sep}`;
  hash += `${fs.leastPopularCheck}${sep}`;
  hash += `${fs.startsWith}${sep}`;
  hash += `${fs.contains}${sep}`;
  hash += `${fs.endsWith}`;
  return hash;
}


function parseHash(hashStr) {
  if (hashStr.startsWith("#")) {
    hashStr = hashStr.slice(1);
  }
  const parts = hashStr.split(sep);
  if (parts.length < 10) {
    console.log("not enough parts", parts);
    return;
  }
  const filterState = {
    badNames: [],
  };
  const startYear = parseInt(parts[0]);
  if (startYear >= 1880 && startYear <= 2025) {
    filterState.startYear = startYear;
  }
  const endYear = parseInt(parts[1]);
  if (endYear >= 1880 && endYear <= 2025) {
    filterState.endYear = endYear;
  }
  const sex = parts[2];
  filterState.sex = sex;

  const wasPopular = parseInt(parts[3]);
  if (wasPopular >= 0) {
    filterState.wasPopular = wasPopular;
  }
  const wasPopularCheck = parts[4];
  if (wasPopularCheck === "true") {
    filterState.wasPopularCheck = true;
  }
  const mostPopular = parseInt(parts[5]);
  if (mostPopular >= 0) {
    filterState.mostPopular = mostPopular;
  }
  const mostPopularCheck = parts[6];
  if (mostPopularCheck === "true") {
    filterState.mostPopularCheck = true;
  }
  const leastPopular = parseInt(parts[7]);
  if (leastPopular >= 0) {
    filterState.leastPopular = leastPopular;
  }
  const leastPopularCheck = parts[8];
  if (leastPopularCheck === "true") {
    filterState.leastPopularCheck = true;
  }

  const startsWith = parts[9];
  filterState.startsWith = startsWith;
  const contains = parts[10];
  filterState.contains = contains;
  const endsWith = parts[11];
  filterState.endsWith = endsWith;

  console.log("parsed hash", hashStr, filterState);
  return filterState;
}

async function processNameData(names, filterState) {
  const startYear = filterState.startYear;
  const endYear = filterState.endYear;
  const badNames = filterState.badNames;
  const startsWithFilter = filterState.startsWith;
  const containsFilter = filterState.contains;
  const endsWithFilter = filterState.endsWith;

  const candidateNames = {};
  for (const [name, yearRanks] of Object.entries(names)) {
    if (badNames.includes(name)) {
      continue;
    }
    if (startsWithFilter && !name.toLowerCase().startsWith(startsWithFilter)) {
      continue;
    }
    if (containsFilter && !name.toLowerCase().includes(containsFilter)) {
      continue;
    }
    if (endsWithFilter && !name.toLowerCase().endsWith(endsWithFilter)) {
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

function initFilterNames() {
  const filterState = parseHash(document.location.hash);
  if (filterState) {
    setInputsFromFilterState(filterState);
  }
  filterNames();
}

function getFilterStateFromInputs() {
  // TODO: validate & constrain values
  const startYear = parseInt(startYearInput.value);
  const endYear = parseInt(endYearInput.value);
  const startsWith = startsWithElem.value.toLowerCase();
  const contains = containsElem.value.toLowerCase();
  const endsWith = endsWithElem.value.toLowerCase();
  const wasPopular = parseInt(wasPopularElem.value);
  const wasPopularCheck = wasPopularCheckElem.checked;
  const mostPopular = parseInt(mostPopularElem.value);
  const mostPopularCheck = mostPopularCheckElem.checked;
  const leastPopular = parseInt(leastPopularElem.value);
  const leastPopularCheck = leastPopularCheckElem.checked;
  const sex = sexElem.value;

  const filterState = {
    startsWith,
    contains,
    endsWith,
    badNames: [],
    wasPopular,
    wasPopularCheck,
    mostPopular,
    mostPopularCheck,
    leastPopular,
    leastPopularCheck,
    sex,
    startYear,
    endYear,
  };
  return filterState;
}

function setInputsFromFilterState(fs) {
  const startYear = parseInt(fs.startYear);
  if (startYear) {
    startYearInput.value = startYear;
  }
  const endYear = parseInt(fs.endYear);
  if (endYear) {
    endYearInput.value = endYear;
  }
  if (fs.startsWith) {
    startsWithElem.value = fs.startsWith;
  }
  if (fs.contains) {
    containsElem.value = fs.contains;
  }
  if (fs.endsWith) {
    endsWithElem.value = fs.endsWith;
  }
  const wasPopular = parseInt(fs.wasPopular);
  if (wasPopular) {
    wasPopularElem.value = wasPopular;
  }
  wasPopularCheckElem.checked = fs.wasPopularCheck;
  const mostPopular = parseInt(fs.mostPopular);
  if (mostPopular) {
    mostPopularElem.value = mostPopular;
  }
  mostPopularCheckElem.checked = fs.mostPopularCheck;
  const leastPopular = parseInt(fs.leastPopular);
  if (leastPopular) {
    leastPopularElem.value = leastPopular;
  }
  leastPopularCheckElem.checked = fs.leastPopularCheck;

  if (["M", "F"].includes(fs.sex)) {
    sexElem.value = fs.sex;
  }
}

async function filterNames() {
  setSpinner();

  const filterState = getFilterStateFromInputs();

  return Promise.resolve().then(function () {return filterNames_(filterState);});
}

async function filterNames_(filterState) {
  if (typeof compactNameData === "undefined") {
    console.log("Name data not loaded yet.");
    return;
  }

  const sex = filterState.sex;
  const wasPopular = filterState.wasPopular;
  const wasPopularCheck = filterState.wasPopularCheck;
  const mostPopular = filterState.mostPopular;
  const mostPopularCheck = filterState.mostPopularCheck;
  const leastPopular = filterState.leastPopular;
  const leastPopularCheck = filterState.leastPopularCheck;

  const start = Date.now();
  let stepTime = start;
  console.log(
    "filtering names",
    filterState,
    stepTime,
  );

  const allCandidateNames = {
    M: {},
    F: {},
  };

  // compact data json format:
  // {"M":{"John":[1, 1, 2, ...]}}

  document.location.hash = makeHash(filterState);

  if (sex) {
    allCandidateNames[sex] = await processNameData(compactNameData[sex], filterState);
  } else {
    allCandidateNames["M"] = await processNameData(compactNameData["M"], filterState);
    allCandidateNames["F"] = await processNameData(compactNameData["F"], filterState);
  }

  console.debug("processed name data", Date.now()-stepTime);
  stepTime = Date.now();
  const names = [];

  // TODO: add bad names filter.
  const badNames = [];
  for (const [sexKey, candidateNames] of Object.entries(allCandidateNames)) {
    if (sex && sexKey !== sex) {
      // console.log(`skipping ${sexKey} because sex doesn't match ${sex}`)
      continue;
    }
    for (const [name, ranking] of Object.entries(candidateNames)) {
      if (wasPopularCheck && wasPopular > 0 && ranking.max > wasPopular) {
        // console.log(`skipping ${name} because ranking ${ranking.max} is too popular ${mostPopular}`)
        continue;
      }
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
  console.debug("filtered name data", Date.now()-stepTime);
  stepTime = Date.now();

  setCount(Object.keys(names).length);
  console.debug("set count", Date.now()-stepTime);
  stepTime = Date.now();

  names.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name === b.name) {
      return 0;
    }
    return 1;
  });
  console.debug("sorted results", Date.now()-stepTime);
  stepTime = Date.now();

  await setResults(names);
  const end = Date.now();
  console.debug("set results", end-stepTime, end-start);
}

async function setResults(names) {
  if (names.length === 0) {
    resultsElem.innerHTML = "No matching results.";
  }
  resultsElem.innerHTML = "";

  if (names.length > maxResults) {
    names = names.slice(0, maxResults);
    resultsElem.innerHTML = `<p>Only showing first 10,000 results.</p>`;
  }
  resultsElem.innerHTML += `<table style="table-layout: fixed; width: 100%;">
  <thead>
    <th onclick="sortByName()" style="width: 35%; text-align: left;">Name</th>
    <th style="width: 24px;"></th>
    <th onclick="sortBymaxRank()" style="text-align: right; cursor: pointer;">Max rank</th>
    <th onclick="sortByminRank()" style="text-align: right;">Min rank</th>
  </thead>
  <tbody id="results_rows">
  </tbody>
</table>`;

  const rowsElem = document.getElementById("results_rows");
  // Construct rows in a fragment so we don't re-render the page every time we add a row.
  const rowsFragment = document.createDocumentFragment();
  // TODO: async add groups of rows to resultsElem.
  names.forEach(function (name) {
    const row = document.createElement("tr");
    row.setAttribute("id", `row-${name.name}-${name.sex}`)
    row.setAttribute("onclick", `chartName('${name.name}', '${name.sex}')`);
    row.setAttribute("style", "cursor: pointer;");
    row.innerHTML = `
      <td style="width: 35%; min-width: 100px;">${name.name}</td>
      <td style="width: 24px;">${name.sex}</td>
      <td style="text-align: right;">${name.max}</td>
      <td style="text-align: right;">${name.min}</td>`;
    rowsFragment.appendChild(row);
  });

  rowsElem.appendChild(rowsFragment);
}

function setSpinner() {
  resultsElem.innerHTML = "Processing..."
  setCount("");
}

function setCount(count) {
  countElem.innerHTML = count;
}

const allElems = [
  countElem,
  startYearInput,
  endYearInput,
  wasPopularElem,
  wasPopularCheckElem,
  mostPopularElem,
  mostPopularCheckElem,
  leastPopularElem,
  leastPopularCheckElem,
  startsWithElem,
  containsElem,
  endsWithElem,
  sexElem,
]

const formElem = document.getElementById("name_form");
formElem.disabled = false;

allElems.forEach(function (elem) {
  elem.disabled = false;
  elem.onchange = filterNames;
});
