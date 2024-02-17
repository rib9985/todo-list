import * as logic from './modules/Logic'
import UI from './modules/UI'

UI.addEventListeners()
logic.instantiateDefaultProjects()
console.log(logic.projects)