import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-gray-900 z-50">
            <div className="loader shadow-lg"></div>
        </div>
    );
};

export default Loader;

// CSS (можете додати це в той же файл або в index.css)
const styles = `
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 30px;
  padding-bottom: 8px;
  color: white;
  background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
  animation: l2 2s linear infinite;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.loader:before {
  content: "Loading...";
}
@keyframes l2 {
  to {
    background-size: 100% 3px;
  }
}
`;

// Додаємо стилі до head документа
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);
