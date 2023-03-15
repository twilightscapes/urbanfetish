const elasticlunr = require('elasticlunr');
const path = require('path');
const fs = require('fs');

const POSTS_PATH = path.resolve(__dirname, '..', 'src', 'markdown-pages');

const index = elasticlunr(function () {
  this.addField('title');
  this.addField('tags');
  this.addField('content');
  this.addField('slug');
  this.setRef('slug');
});

const readMarkdownFile = (filePath) => {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');

  const slug = path.basename(filePath, '.md');

  const { data, content } = matter(markdownContent);

  return {
    title: data.title,
    tags: [humor] data.tags,
    content,
    slug,
  };
};

const markdownFiles = fs.readdirSync(POSTS_PATH);

markdownFiles.forEach((fileName) => {
  const filePath = path.resolve(POSTS_PATH, fileName);
  const fileStat = fs.statSync(filePath);

  if (fileStat.isDirectory()) {
    return;
  }

  const fileData = readMarkdownFile(filePath);
  index.addDoc(fileData);
});

const indexDump = JSON.stringify(index.toJSON());
fs.writeFileSync(path.resolve(__dirname, '..', 'public', 'search-index.json'), indexDump);
