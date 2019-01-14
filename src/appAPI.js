import request from 'request-promise';
import _ from 'lodash';

import config from './config';

class AppAPI {
  async refreshToken() {
    // if cached, return immediately
    if (this.access_token) return Promise.resolve(this.access_token);

    console.info('Fetching new app token');
    const params = {
      method: 'POST',
      url: `https://${config.auth.domain}/oauth2/token`,
      qs: {
        grant_type: 'client_credentials',
      },
      auth: {
        user: config.app.client_id,
        pass: config.app.client_secret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true,
    };

    /* Sample Response
      {
        "access_token": "...."
        "expires_in": 3600,
        "token_type": "Bearer"
      }
    */
    const response = await request(params);
    this.access_token = response.access_token;

    return Promise.resolve(this.access_token);
  }

  async _callApi(params) {
    /* inject the access token in all api calls */
    return this.refreshToken()
      .then(() => request(_.merge(params, { auth: { bearer: this.access_token } })));
  }

  async getInstallations() {
    const params = {
      method: 'GET',
      url: `http://${config.api.domain}/api/app/installations`,
      json: true,
    };

    return this._callApi(params);
  }

  async getInstallation(id) {
    const params = {
      method: 'GET',
      url: `http://${config.api.domain}/api/app/installations/${id}`,
      json: true,
    };

    return this._callApi(params);
  }

  async getInstallationAccessTokens(id) {
    const params = {
      method: 'GET',
      url: `http://${config.api.domain}/api/app/installations/${id}/access_tokens`,
      json: true,
    };

    return this._callApi(params);
  }
}

export default AppAPI;
