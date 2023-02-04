#!/usr/bin/env node

import util from 'util'
import { exec } from 'child_process'

const execc = util.promisify(exec);

// --| Run Command ------------------------------
export async function runCommand(command) {
    var output = "";

    const { stdout, stderr } = await execc(command);
    if (stderr) { console.log(stderr) }
    if (stdout) { output = stdout.toString(); }

    return output;
}

export default { runCommand };