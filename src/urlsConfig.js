import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
//Dev URLs
export const homePage='https://apiarydev-react-homepage.azurewebsites.net';
export const wufooPage='https://apiarydev-linux-iwufoo.azurewebsites.net/';
export const wufooBugs='https://apiarydev-react-homepage.azurewebsites.net/bugs';
export const workMang='https://apiarydev-react-workmanagement.azurewebsites.net/';
export const esriPage='https://apiarydev-linux-iesri.azurewebsites.net/';
export const springbrook='https://apiarydev-windows-ispringbrook.azurewebsites.net/api/';
export const maps='https://apiarydev-react-maps.azurewebsites.net/';
export const disconnects='https://apiarydev-windows-ispringbrook.azurewebsites.net/api/disconnect';
// //Test URLs
// export const homePage='pandora.verawaterandpower.com';
// export const wufuPage='https://apiarytest-linux-iwufoo.azurewebsites.net/';
// export const workMang='https://apiarytest-react-workmanagement.azurewebsites.net/';
// export const esriPage='https://apiarytest-linux-iesri.azurewebsites.net/esriGet/';
// export const springbrook='https://apiarytest-windows-ispringbrook.azurewebsites.net/api/';

// // This is the Azure auth congig for test
// const adalConfig = {
//  tenant: 'ebba2929-765b-48f7-8c03-9b450ed099ba',
//  clientId: 'a3620ea5-8460-480a-a3f0-f2a7f8e0d41b',
//  endpoints: {
//      api: 'a3620ea5-8460-480a-a3f0-f2a7f8e0d41b'
//  },
//  apiUrl: 'https://pandora.verawaterandpower.com',
//  cacheLocation: 'localStorage'
// };
// export const authContext = new AuthenticationContext(adalConfig);
// export const adalApiFetch = (fetch, url, options) =>
//     adalFetch(authContext, adalConfig.endpoints.api, fetch, adalConfig.apiUrl + url, options);
// export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);



// //Prod URLs
// export const homePage='';
// export const wufuPage='';
// export const workMang='';
// export const esriPage='';
// export const springbrook='';
