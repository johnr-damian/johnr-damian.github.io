import Cube from './library/cube';
import Program from './library/main';

let current_program = null;

current_program = Program.GetInstance(new Cube());
current_program.Main();