import React, { useState } from 'react';
import axios from 'axios';

const ConnectFacebookPage = () => {
  const [pageId, setPageId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/connect-page', { pageId });
      if (response.data.success) {
        alert('Page connected successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Connect your Facebook Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Page ID"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
        />
        <button type="submit">Connect Page</button>
      </form>
    </div>
  );
};

export default ConnectFacebookPage;