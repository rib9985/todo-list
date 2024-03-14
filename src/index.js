import * as logic from './modules/Logic';
import UI from './modules/UI';

// localStorage.clear();
logic.checkForStorage();
UI.reloadProjects();
UI.addEventListeners();
UI.setFormDatesToToday();
UI.updateTodoList(UI.getActiveProject());
