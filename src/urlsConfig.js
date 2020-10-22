import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
// Dev URLs
export const homePage='https://apiarydev-react-homepage.azurewebsites.net';
export const wufooPage='https://apiarydev-linux-iwufoo.azurewebsites.net/';
export const wufooBugs='https://apiarydev-react-homepage.azurewebsites.net/bugs';
export const workMang='https://apiarydev-react-workmanagement.azurewebsites.net/';
export const esriPage='https://apiarydev-linux-iesri.azurewebsites.net/';
export const springbrook='https://apiarydev-windows-ispringbrook.azurewebsites.net/api/';
export const maps='https://apiarydev-react-maps.azurewebsites.net/';
export const payments='https://apiarydev-react-payments.azurewebsites.net';

const adalConfig = {
    tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
    clientId: 'cabc95af-1f4d-4f5c-8db0-03e462c2b3dd',
    endpoints: {
        api: 'cabc95af-1f4d-4f5c-8db0-03e462c2b3dd'
    },
    apiUrl: 'https://apiarydev-react-maps.azurewebsites.net/',
    cacheLocation: 'localStorage'
   };
   export const authContext = new AuthenticationContext(adalConfig);
   export const adalApiFetch = (fetch, url, options) =>
       adalFetch(authContext, adalConfig.endpoints.api, fetch, adalConfig.apiUrl + url, options);
   export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
   export const getToken =  authContext.getCachedToken(adalConfig.clientId);
   

//Test URLs
// export const homePage='https://pandora.verawaterandpower.com/';
// export const wufooPage='https://apiarytest-linux-iwufoo.azurewebsites.net/';
// export const workMang='https://apiarytest-react-workmanagement.azurewebsites.net/';
// export const esriPage='https://apiarytest-linux-iesri.azurewebsites.net/';
// export const springbrook='https://apiarytest-windows-ispringbrook.azurewebsites.net/api/';
// export const maps='https://apiarytest-react-maps.azurewebsites.net/';
// export const wufooBugs='https://pandora.verawaterandpower.com/bugs';
// export const payments='https://apiarytest-react-payments.azurewebsites.net';

// // This is the Azure auth congig for test
// const adalConfig = {
//  tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
//  clientId: '02fd37c2-75b0-4f4f-b069-9524524d31cb',
//  endpoints: {
//      api: '02fd37c2-75b0-4f4f-b069-9524524d31cb'
//  },
//  apiUrl: 'https://apiarytest-react-maps.azurewebsites.net/',
//  cacheLocation: 'localStorage'
// };
// export const authContext = new AuthenticationContext(adalConfig);
// export const adalApiFetch = (fetch, url, options) =>
//     adalFetch(authContext, adalConfig.endpoints.api, fetch, adalConfig.apiUrl + url, options);
// export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
// export const getToken =  authContext.getCachedToken(adalConfig.clientId);


// //Prod URLs
// export const homePage='';
// export const wufuPage='';
// export const workMang='';
// export const esriPage='';
// export const springbrook='';
