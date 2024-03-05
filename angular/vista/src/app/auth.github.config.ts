import {AuthConfig} from "angular-oauth2-oidc";

export const githubAuthConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://github.com/login/oauth/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '42be72dcdfe28588558b',
  

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'read:user user:email',

  showDebugInformation: true,

  sessionChecksEnabled: true,
  oidc: false,
};
