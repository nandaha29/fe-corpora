// lib/rich-text-helpers.ts
export function plainTextToRichText(plainText: string): string {
  // Convert plain text dengan paragraf ke HTML
  const paragraphs = plainText.split('\n\n');
  
  const html = paragraphs
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      
      // Detect headings (lines starting with #)
      if (trimmed.startsWith('# ')) {
        return `<h2>${trimmed.slice(2)}</h2>`;
      }
      if (trimmed.startsWith('## ')) {
        return `<h3>${trimmed.slice(3)}</h3>`;
      }
      if (trimmed.startsWith('### ')) {
        return `<h4>${trimmed.slice(4)}</h4>`;
      }
      
      // Detect lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n')
          .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))
          .map(line => `<li>${line.trim().slice(2)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      
      // Detect numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n')
          .filter(line => /^\d+\.\s/.test(line.trim()))
          .map(line => {
            const text = line.trim().replace(/^\d+\.\s/, '');
            return `<li>${text}</li>`;
          })
          .join('');
        return `<ol>${items}</ol>`;
      }
      
      // Regular paragraph with inline formatting
      let formatted = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>'); // Links
      
      return `<p>${formatted}</p>`;
    })
    .filter(Boolean)
    .join('');
  
  return html;
}

// Example usage
export function convertSubcultureHistory(history: string): string {
  // Check if already HTML
  if (history.includes('<') && history.includes('>')) {
    return history;
  }
  
  // Convert plain text to HTML
  return plainTextToRichText(history);
}