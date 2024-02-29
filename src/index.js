import * as logic from './modules/Logic';
import UI from './modules/UI';

logic.checkForStorage();
UI.reloadProjects();
UI.addEventListeners();
UI.updateTodoList(UI.getActiveProject());
