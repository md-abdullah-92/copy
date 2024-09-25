// hooks/useFarmingAdvice.ts
import { useState, FormEvent } from 'react';

export const useFarmingAdvice = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.choices[0]?.message?.content || 'No response');
      } else {
        setResponse(data.error || 'An error occurred');
      }
    } catch (error) {
      setResponse('Failed to fetch response from the server.');
    }
  };

  const handleClear = () => {
    setResponse(null);
    setInput('');
  };

  const handlePrint = () => {
    if (response) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Farming Advice - Print</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  color: #333;
                }
                .response-container {
                  border: 1px solid #ccc;
                  padding: 10px;
                  border-radius: 8px;
                  background-color: #f9f9f9;
                }
                .response-header {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  color: #4b8b3b;
                }
                .response-content {
                  font-size: 16px;
                  white-space: pre-wrap;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <div class="response-container">
                <div class="response-header">Farming Advice Response</div>
                <div class="response-content">${response}</div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };
  

  return {
    input,
    response,
    setInput,
    handleSubmit,
    handleClear,
    handlePrint,
  };
};