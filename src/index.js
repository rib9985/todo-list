import * as logic from './modules/Logic';
import UI from './modules/UI';
import Storage from './modules/LocalStorage';

UI.addEventListeners();
logic.checkForStorage();
console.log(logic.projects);
