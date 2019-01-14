import request from 'request-promise';
import _ from 'lodash';

import AppAPI from './appAPI';
import config from './config';

const appApi = new AppAPI();

class InstallationAPI {
  constructor(installation) {
    this.installation = installation;
  }

  async refreshToken() {
    // if cached, return immediately
    if (this.access_token) return Promise.resolve(this.access_token);

    console.info('Fetching new installation token');

    /* Sample Response
      {
        "access_token": "...."
        "expires_in": 3600,
        "token_type": "Bearer"
      }
    */
    const response = await appApi.getInstallationAccessTokens(this.installation._id);
    this.access_token = response.access_token;

    return Promise.resolve(this.access_token);
  }

  async _callApi(params) {
    /* inject the access token in all api calls */
    return this.refreshToken()
      .then(() => request(_.merge(params, { auth: { bearer: this.access_token } })));
  }

  async getShift() {
    const params = {
      method: 'GET',
      url: `http://${config.api.domain}/api/shift/`,
      json: true,
    };

    return this._callApi(params);
  }
}

export default InstallationAPI;
