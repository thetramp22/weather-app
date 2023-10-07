export default class Units {
  constructor(tempUnits = "&deg;F", speedUnits = "mph", distUnits = "in") {
    this.tempUnits = tempUnits;
    this.speedUnits = speedUnits;
    this.distUnits = distUnits;
  }

  getTempUnits() {
    return this.tempUnits;
  }

  getDistUnits() {
    return this.speedUnits;
  }

  toggleUnits() {
    if (this.tempUnits === "&deg;F") {
      this.tempUnits = "&deg;C";
      this.speedUnits = "kph";
      this.distUnits = "mm";
    } else {
      this.tempUnits = "&deg;F";
      this.speedUnits = "mph";
      this.distUnits = "in";
    }
  }
}
