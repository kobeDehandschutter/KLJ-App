import '@testing-library/jest-dom';
import nock from 'nock';

// Nock uses it in abortPendingRequests, Jest removed it (see https://github.com/facebook/jest/pull/11222) for jsdom env
global.clearImmediate = () => {};

// Disable real http requests.
nock.disableNetConnect();

// Setup process.env variables for Jest
process.env.VERSION = '1.0.0.JEST';
process.env.BUILD_DATE = '2022-05-20T00:00:00.000Z';
process.env.REACT_APP_API_BASE_URL = 'http://localhost/jest-test-api';
