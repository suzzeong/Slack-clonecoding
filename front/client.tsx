import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '@layouts/App';
import SWRDevtools from '@jjordy/swr-devtools';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3090';
console.log('env', process.env.NODE_ENV === 'production');
render(
  <BrowserRouter>
    {process.env.NODE_ENV === 'production' ? (
      <App />
    ) : (
      <SWRDevtools>
        <App />
      </SWRDevtools>
    )}
  </BrowserRouter>,
  document.querySelector('#app'),
);

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃
