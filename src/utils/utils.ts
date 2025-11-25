import { marked } from 'marked';

// Configure marked for better line break handling
marked.setOptions({
  breaks: true,        // Convert line breaks to <br>
  gfm: true           // GitHub Flavored Markdown
});

// Simple utility function for rendering markdown content
// This handles the case where content might be a rich text object from Keystatic
// or simple markdown string

export function renderMarkdown(content: any): string {
  if (!content) return '';
  
  // If it's already a string, process it as markdown
  if (typeof content === 'string') {
    return marked.parse(content) as string;
  }
  
  // If it's a Keystatic rich text object, it should have a rendered property
  if (content && typeof content === 'object') {
    // For Keystatic Document field content, it's typically already rendered
    if (content.toString) {
      return marked.parse(content.toString()) as string;
    }
    
    // If it has a content property, try that
    if (content.content) {
      return renderMarkdown(content.content);
    }
    
    // If it's an array (like some rich text formats), join it
    if (Array.isArray(content)) {
      return content.map(item => renderMarkdown(item)).join('');
    }
    
    // Try to stringify the object as a fallback
    return marked.parse(JSON.stringify(content)) as string;
  }
  
  return marked.parse(String(content)) as string;
}

export { getFormattedDate } from "./date";
export { elementHasClass, toggleClass, rootInDarkMode } from "./domElement";
export { generateToc, type TocItem } from "./generateToc";
