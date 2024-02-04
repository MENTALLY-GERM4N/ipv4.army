import { exec } from 'child_process';

const runCommands = async () => {
    try {
        await execCommand('git add .');
        await execCommand('git commit -m "Auto commit"');
        await execCommand('git push');
        await execCommand('bun run build');
        await execCommand('bun run deploy');
    } catch (error) {
        console.error(`Error executing command: ${error}`);
    }
};

const execCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            console.log(`'${command}' output: ${stdout}`);
            console.error(`'${command}' error: ${stderr}`);
            resolve();
        });
    });
};

runCommands();