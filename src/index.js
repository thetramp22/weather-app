import "./style.scss";
import * as UI from "./modules/UI";

const searchLocation = "Carmichael";

async function loadPage(location) {
  UI.initializeBtns();
  UI.updateUI();
}

loadPage(searchLocation);
