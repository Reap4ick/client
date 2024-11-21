import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

interface ProductEditorProps {
  onSave: (description: string) => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ }) => {
  const [content, setContent] = useState<string>('');

  const saveProductDescription = async (description: string) => {
    try {
      const response = await axios.post('/api/products', {
        name: 'New Product',
        description,
      });
      if (response.status === 200) {
        alert('Продукт збережено!');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = () => {
    saveProductDescription(content);
  };

  return (
    <div>
      <Editor
        apiKey="YOUR_TINYMCE_API_KEY"
        initialValue="<p>Опис продукту...</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Зберегти опис</button>
    </div>
  );
};

export default ProductEditor;
