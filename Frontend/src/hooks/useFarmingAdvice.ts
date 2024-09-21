// hooks/useFarmingAdvice.ts
import { useState, FormEvent } from 'react';

export const useFarmingAdvice = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/chat', {
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
      printWindow?.document.write(`<pre>${response}</pre>`);
      printWindow?.document.close();
      printWindow?.print();
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
