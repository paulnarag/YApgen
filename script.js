console.log("Script loaded");


const charSliderContainer = document.getElementById("charSliderContainer")
const charSlider = document.getElementById("charSlider")
const noOfCharsOutput = document.getElementById("noOfCharsOutput")

noOfCharsOutput.innerHTML = charSlider.value

charSlider.oninput = function() {
    noOfCharsOutput.innerHTML = this.value
}