import fs from 'fs';

function addIgnoreComment(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const newContent = '// @ts-nocheck\n' + content;
    fs.writeFileSync(filePath, newContent, 'utf-8');
}

// (Modify this to find your TypeScript files)
fs.readdirSync('./src').forEach(file => {
    if (file.endsWith('.ts')) {
        addIgnoreComment(`./src/${file}`);
    }
});
