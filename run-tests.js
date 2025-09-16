const { spawn } = require('child_process');

async function runTests() {
    // First run the memo creation test
    const createMemo = spawn('npx', ['playwright', 'test', 'tests/test.test.js', '--headed']);
    
    createMemo.stdout.on('data', (data) => {
        console.log(`Create Memo Output: ${data}`);
    });

    createMemo.stderr.on('data', (data) => {
        console.error(`Create Memo Error: ${data}`);
    });

    await new Promise((resolve) => {
        createMemo.on('close', (code) => {
            console.log(`Create memo test exited with code ${code}`);
            resolve();
        });
    });

    // Then run the search test
    const searchTask = spawn('npx', ['playwright', 'test', 'tests/testworkflow.test.ts', '--headed']);
    
    searchTask.stdout.on('data', (data) => {
        console.log(`Search Task Output: ${data}`);
    });

    searchTask.stderr.on('data', (data) => {
        console.error(`Search Task Error: ${data}`);
    });

    searchTask.on('close', (code) => {
        console.log(`Search task test exited with code ${code}`);
    });
}

runTests();
