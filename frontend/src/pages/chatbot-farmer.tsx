// pages/index.tsx
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button';
import { useFarmingAdvice } from '../hooks/useFarmingAdvice';

const GetFarmingAdvice = () => {
  const { input, response, setInput, handleSubmit, handleClear, handlePrint } = useFarmingAdvice();

  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Head>
        <title>Farming Business Ideas and Tips</title>
        <meta name="description" content="Get tailored advice for your farming business." />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div style={{ backgroundColor: '#e0f7fa', paddingBottom: '150px', paddingTop: '150px' }}>
          <div
            style={{
              padding: '50px',
              maxWidth: '700px',
              margin: '0 auto',
              fontFamily: 'Verdana, sans-serif',
              color: '#333',
              backgroundColor: '#f5fff7',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                fontSize: '26px',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#6a8f4a',
              }}
            >
              Farming Business Ideas and Tips
            </h1>
            <p
              style={{
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '16px',
                color: '#555',
              }}
            >
              Get advice for your farming business from our AI chatbot.
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
                <Button
                  label="Get Advice"
                  type="submit"
                  backgroundColor="#9acd32"
                  onMouseOverColor="#82b900"
                  textColor="#fff"
                />
                <Button
                  label="Clear"
                  onClick={handleClear}
                  backgroundColor="#f44336"
                  onMouseOverColor="#c62828"
                  textColor="#fff"
                />
                <Button
                  label="Print"
                  onClick={handlePrint}
                  backgroundColor="#0288d1"
                  onMouseOverColor="#0277bd"
                  textColor="#fff"
                />
              </div>
            </form>
            {response && (
              <div
                style={{
                  marginTop: '30px',
                  padding: '12px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '6px',
                  border: '1px solid #c8e6c9',
                  fontSize: '15px',
                }}
              >
                <strong>Response:</strong>
                <div>
                  {response.split('\n').map((line, index) => (
                    <p key={index} style={{ margin: '0' }}>
                      {renderTextWithBold(line)}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default GetFarmingAdvice;
