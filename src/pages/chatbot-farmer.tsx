// pages/index.tsx
import { useState, FormEvent } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const GetFarmingAdvice = () => {
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

  return (
    <>
      <Head>
        <title>Farming Business Ideas and Tips</title>
        <meta name="description" content="Get tailored advice for your farming business." />
      </Head>
      <Layout>
        <div style={{ backgroundColor: '#e0f7fa',paddingBottom :'150px',paddingTop:'150px' }}>
          <div style={{ padding: '50px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Verdana, sans-serif', color: '#333', backgroundColor: '#f5fff7', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '30px', color: '#6a8f4a' }}>
              Farming Business Ideas and Tips
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '16px', color: '#555' }}>
              Enter your question or idea below to get tailored advice for your farming business.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your question here..."
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '1px solid #b5cbb7',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#9acd32',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    flexGrow: 1,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#82b900')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#9acd32')}
                >
                  Get Advice
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  style={{
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    flexGrow: 1,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c62828')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#0288d1',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    flexGrow: 1,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0277bd')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0288d1')}
                >
                  Print
                </button>
              </div>
            </form>
            {response && (
              <p
                style={{
                  marginTop: '30px',
                  padding: '12px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '6px',
                  border: '1px solid #c8e6c9',
                  fontSize: '15px',
                }}
              >
                <strong>Response:</strong> {response}
              </p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default GetFarmingAdvice;
