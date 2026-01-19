"use strict";

function chartName(name, sex) {
  const filterState = getFilterStateFromInputs();
  chart(name, sex, filterState.startYear, filterState.endYear);
}

function generateChartData(name, sex, startYear, endYear) {
  // name = name.toLowerCase();
  const nameData = compactNameData[sex][name];
  if (!nameData) {
    console.error("no name data found for", sex, name);
    return;
  }
  const chartData = [];
  nameData.forEach(function (yearRank, i) {
    if (i < startYear - 1880 || i > endYear - 1880) {
      return;
    }
    chartData.push({
      year: new Date(`${i + 1880}`),
      rank: yearRank,
    });
  })
  return chartData;
}

function chart (name, sex, startYear, endYear) {
  // Declare the chart dimensions and margins.
  const width = Math.min(570, window.innerWidth-10);
  const height = 300;
  const marginTop = 15;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 30;

  const chartData = generateChartData(name, sex, startYear, endYear);
  if (!chartData) {
    console.error("No name data for", sex, name);
  }

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(d3.extent(chartData, d => d.year), [marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLog(
    [d3.max(chartData, d => d.rank), 1],
    [height - marginBottom, marginTop],
  );

  // Declare the line generator.
  const line = d3.line()
      .defined(d => d.rank > 0)
      .x(d => x(d.year))
      .y(d => y(d.rank));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "height: auto; height: intrinsic;");

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Rank (Popularity)"));

  // Append a path for the line.
  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("d", line(chartData.filter(d => d.rank > 0)));

  // Append a path for the line.
  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#077")
      .attr("stroke-width", 1.5)
      .attr("d", line(chartData));

  const chartNode = svg.node();
  let chartElem = document.getElementById(`chart-${name}-${sex}`);
  if (chartElem) {
    console.log("Chart visible. Removing.");
    chartElem.remove();
    return;
  }
  chartElem = document.createElement("tr");
  chartElem.setAttribute("id", `chart-${name}-${sex}`);
  const row = document.getElementById(`row-${name}-${sex}`);
  row.after(chartElem);
  chartElem.replaceChildren(chartNode);
}
