import { useEffect, useRef } from 'react';
import {
  Bold,
  Eraser,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
} from 'lucide-react';
import './RichTextEditor.css';

export default function RichTextEditor({ value, onChange, placeholder = 'İçeriğinizi buraya yazın...' }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const addLink = () => {
    const url = window.prompt('Bağlantı URL');
    if (url) {
      runCommand('createLink', url);
    }
  };

  const addImage = () => {
    const url = window.prompt('Görsel URL');
    if (url) {
      runCommand('insertImage', url);
    }
  };

  const toolbarButtons = [
    { label: 'Başlık 2', icon: Heading2, action: () => runCommand('formatBlock', 'h2') },
    { label: 'Başlık 3', icon: Heading3, action: () => runCommand('formatBlock', 'h3') },
    { label: 'Kalın', icon: Bold, action: () => runCommand('bold') },
    { label: 'İtalik', icon: Italic, action: () => runCommand('italic') },
    { label: 'Altı çizili', icon: Underline, action: () => runCommand('underline') },
    { label: 'Madde listesi', icon: List, action: () => runCommand('insertUnorderedList') },
    { label: 'Numaralı liste', icon: ListOrdered, action: () => runCommand('insertOrderedList') },
    { label: 'Alıntı', icon: Quote, action: () => runCommand('formatBlock', 'blockquote') },
    { label: 'Bağlantı', icon: LinkIcon, action: addLink },
    { label: 'Görsel', icon: Image, action: addImage },
    { label: 'Biçimi temizle', icon: Eraser, action: () => runCommand('removeFormat') },
  ];

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar" aria-label="Metin düzenleyici araçları">
        {toolbarButtons.map(({ label, icon: Icon, action }) => (
          <button
            key={label}
            type="button"
            className="rich-text-toolbar-button"
            onClick={action}
            title={label}
            aria-label={label}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        className="rich-text-input"
        contentEditable
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
      />
    </div>
  );
}
