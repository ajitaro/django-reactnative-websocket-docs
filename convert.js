const fs = require('fs')
const showdown = require('showdown')

// Create a new converter instance
const converter = new showdown.Converter()

// Read your markdown file
const markdown = fs.readFileSync('README.md', 'utf8')

// Convert the markdown to HTML
const html = converter.makeHtml(markdown)

// Write the HTML output to a file
fs.writeFileSync('index.html', html)

console.log('Conversion complete: index.html')
