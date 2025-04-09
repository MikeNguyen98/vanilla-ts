export class TextEditor extends HTMLElement {
    private editor: HTMLPreElement;
  
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const style = document.createElement('style');
      style.textContent = `
        pre {
          border: 1px solid #ccc;
          padding: 10px;
          min-height: 200px;
          font-family: monospace;
          white-space: pre;
          overflow: auto;
          background: #f4f4f4;
          border-radius: 6px;
        }
      `;
  
      this.editor = document.createElement('pre');
      this.editor.contentEditable = 'true';
  
      this.editor.addEventListener('input', () => {
        this.dispatchEvent(new CustomEvent('change', {
          detail: { value: this.value }
        }));
      });
  
      shadow.append(style, this.editor);
    }
  
    static get observedAttributes() {
      return ['value'];
    }
  
    get value(): string {
      return this.editor.innerText;
    }
  
    set value(val: string) {
      this.editor.innerText = val;
    }
  
    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
      if (name === 'value') {
        this.value = newValue;
      }
    }
  }
  
  customElements.define('text-editor', TextEditor);
  