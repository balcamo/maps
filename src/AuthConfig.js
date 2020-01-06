import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

// This is the Azure auth congig for test
const adalConfig = {
 tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
 clientId: '525a6f4c-451c-436e-ab49-0d8c44303961',
 endpoints: {
     api: '525a6f4c-451c-436e-ab49-0d8c44303961'
 },
 apiUrl: 'https://apiarytest-react-workmanagement.azurewebsites.net',
 cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);
export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, adalConfig.apiUrl + url, options);
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);