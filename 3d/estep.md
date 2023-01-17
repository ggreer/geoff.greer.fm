---
date: '2022-12-12 18:31:19'
layout: page
slug: estep
status: publish
published: true
title: E-step Calibration Calculator
---

A common issue with 3D printers is incorrect extrusion. Under-extrusion can cause unsightly gaps and weaken the print, while over-extrusion can cause ugly blobs and ruin dimensional accuracy. This can often happen if you replace your printer's extruder gear. The fix is to calibrate your printer's extruder steps, or E-steps.

[All3DP has a useful guide on how to calibrate your E-steps](https://all3dp.com/2/extruder-calibration-6-easy-steps-2/), but they neglected to add a calculator. 

---

<form id="form">
<div class="row">
  <div class="col w4" style="text-align: right;">
    <label style="margin-right: 1rem;" for="orig_steps">Original steps/mm</label>
  </div>
  <div class="col w2">
    <input type="text" required="true" style="width: 4rem;" placeholder="93" id="orig_steps" name="orig_steps" /> steps/mm
  </div>
</div>
<div class="row">
  <div class="col w4" style="text-align: right;">
    <label style="margin-right: 1rem;" for="distance">Distance between 120mm line &amp; new line</label>
  </div>
  <div class="col w2">
    <input type="text" required="true" style="width: 4rem;" placeholder="23.5" id="distance" name="distance" /> mm
  </div>
</div>
<div class="row">
  <div class="col w4" style="text-align: right;">
    <label style="margin-right: 1rem;" for="correct_steps">Correct steps/mm</label>
  </div>
  <div class="col w2">
    <input type="text" style="width: 4rem;" id="correct_steps" name="correct_steps" /> steps/mm
  </div>
</div>
<div class="row">
  <div class="col w4">
  </div>
  <div class="col w2">
    <button type="button" onclick="recalculate()" style="width: 100%;">Calculate</button>
  </div>
</div>
</form>

---

## How to use this calculator

1. Load your filament into your printer.
2. Measure 120mm from your extruder and mark the filament at that point.
3. Command the printer to extrude 100mm of filament.
4. Put a second wark on the filament where it feeds into the extruder.
5. Measure the distance between the two marks.
6. In the top input, enter your printer's current extruder steps/mm.
7. In the second input, enter the distance between the two marks.
8. Click calculate to get your calibrated E-steps.
9. Change your printer to use the calibrated E-step number.

Then tada, your printer's extruder should be correctly calibrated!

<script type="text/javascript">
function recalculate(e) {
  var orig_steps_elem = document.getElementById("orig_steps");
  var distance_elem = document.getElementById("distance");
  var correct_steps_elem = document.getElementById("correct_steps");
  var orig_steps = parseFloat(orig_steps_elem.value, 10);
  var distance = parseFloat(distance_elem.value, 10);
  var correct_steps = parseFloat(correct_steps_elem.value, 10);
  console.log(orig_steps, distance, correct_steps);

  correct_steps = (orig_steps * 100) / (120 - distance);
  correct_steps_elem.value = correct_steps.toFixed(2);
  try {
    e.preventDefault();
  } catch (err) {
    // form submit has an event we want to prevent. button click doesn't
    console.error(err);
  }
  return false;
}

var form = document.getElementById("form");
form.addEventListener("submit", recalculate);
console.log(form);
</script>
