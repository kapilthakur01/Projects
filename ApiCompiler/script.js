const codeEditor = document.getElementById('code-editor');
const lineNumbers = document.getElementById('line-numbers');
const languageSelect = document.getElementById('language-select');
const currentFilename = document.getElementById('current-filename');
const runBtn = document.getElementById('run-btn');
const terminal = document.getElementById('terminal');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');

// Language Configurations
const languages = {
    python: {
        name: 'python',
        version: '3.10.0',
        filename: 'main.py',
        template: `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("World")\n# Write your code here...`
    },
    cpp: {
        name: 'c++',
        version: '10.2.0',
        filename: 'main.cpp',
        template: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`
    },
    c: {
        name: 'c',
        version: '10.2.0',
        filename: 'main.c',
        template: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`
    },
    java: {
        name: 'java',
        version: '15.0.2',
        filename: 'Main.java',
        template: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`
    },
    javascript: {
        name: 'javascript',
        version: '18.15.0',
        filename: 'index.js',
        template: `function main() {\n    console.log("Hello from JavaScript!");\n}\n\nmain();`
    }
};

// Initialize
let currentLang = 'python';
codeEditor.value = languages[currentLang].template;
updateLineNumbers();

// Event Listeners
languageSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    codeEditor.value = languages[currentLang].template;
    currentFilename.textContent = languages[currentLang].filename;
    updateLineNumbers();
});

codeEditor.addEventListener('input', () => {
    updateLineNumbers();
    charCount.textContent = `Chars: ${codeEditor.value.length}`;
});

// Sync scroll
codeEditor.addEventListener('scroll', () => {
    lineNumbers.scrollTop = codeEditor.scrollTop;
});

// Handle Tab key
codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        codeEditor.value = codeEditor.value.substring(0, start) + "    " + codeEditor.value.substring(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        updateLineNumbers();
    }
});

runBtn.addEventListener('click', runCode);

clearBtn.addEventListener('click', () => {
    terminal.innerHTML = '<div class="output-line system-msg">Terminal cleared. Ready for next run.</div>';
});

// Functions
function updateLineNumbers() {
    const lines = codeEditor.value.split('\n');
    lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
}

async function runCode() {
    const code = codeEditor.value;
    const langConfig = languages[currentLang];
    
    // UI Feedback
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
    addToTerminal('Compiling and executing...', 'system-msg');

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: langConfig.name,
                version: langConfig.version,
                files: [
                    {
                        name: langConfig.filename,
                        content: code
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.run) {
            if (data.run.stdout) {
                addToTerminal(data.run.stdout, 'stdout');
            }
            if (data.run.stderr) {
                addToTerminal(data.run.stderr, 'stderr');
            }
            if (!data.run.stdout && !data.run.stderr) {
                addToTerminal('(No output)', 'system-msg');
            }
        } else {
            addToTerminal('Error: ' + (data.message || 'Unknown error occurred'), 'stderr');
        }

    } catch (error) {
        addToTerminal('Failed to connect to execution server. Check your internet connection.', 'stderr');
        console.error(error);
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
    }
}

function addToTerminal(text, type) {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}
