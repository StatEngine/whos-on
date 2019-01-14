import moment from 'moment-timezone';

import AppAPI from './appAPI';
import InstallationAPI from './installationAPI';

const appAPI = new AppAPI();
const Installations = [];

const run = async () => {
  // Fetch list of installations
  const installations = await appAPI.getInstallations();
  /* [{
      _id: 24,
      app__id: 21,
      fire_department__id: 1529,
      App:{
        _id: 21,
        name: 'Whos On App',
        slug: 'whoson',
        short_description: 'Demo app to show todays shift',
        description: 'Demo app to show todays shift',
        features: null,
        tags: null,
        permissions: null,
        hidden: null,
        featured: null,
        image_url: null,
        preview_url: null,
        client_secret: 'cesqu5ds6gs350d6gai053l9iho9gu6igu6lj6nvevjhandi9ma',
        client_id: '7r33g2rqj6jptrgrjkock35ic9',
        webhook_url: 'localhost:3001',
        webhook_secret: '1234'
      },
      FireDepartment:{
        es_indices: [Object],
        _id: 1529,
        fd_id: '76000',
        name: 'Richmond Fire and Emergency Services',
        state: 'VA',
        firecares_id: '93345',
        timezone: 'US/Eastern',
        integration_complete: true,
        integration_verified: true,
        latitude: 37.5407,
        longitude: -77.436,
        logo_link: 'https://s3.amazonaws.com/statengine-public-assets/logos/93345.png',
        customer_id: 'FD-123'
      }
    }, {
      _id: 26,
      app__id: 21,
      fire_department__id: 1533,
      App: {
        _id: 21,
        name: 'Whos On App',
        slug: 'whoson',
        short_description: 'Demo app to show todays shift',
        description: 'Demo app to show todays shift',
        features: null,
        tags: null,
        permissions: null,
        hidden: null,
        featured: null,
        image_url: null,
        preview_url: null,
        client_secret: 'cesqu5ds6gs350d6gai053l9iho9gu6igu6lj6nvevjhandi9ma',
        client_id: '7r33g2rqj6jptrgrjkock35ic9',
        webhook_url: 'localhost:3001',
        webhook_secret: '1234'
      },
      FireDepartment: {
        es_indices: [Object],
        _id: 1533,
        fd_id: '11001',
        name: 'Washington DC Fire & EMS Department',
        state: 'DC',
        firecares_id: '98606',
        timezone: 'US/Eastern',
        integration_complete: false,
        integration_verified: false,
        latitude: 47.7511,
        longitude: -120.7401,
        logo_link: null,
        customer_id: null
      }
    }]
  }
  */
  // Store off the installations for easy access
  for (let i = 0; i < installations.length; i += 1) {
    Installations.push(new InstallationAPI(installations[i]));
  }

  // Call protected routes
  setInterval(async () => {
    for (let i = 0; i < Installations.length; i += 1) {
      const installation = Installations[i];
      const fd = installation.installation.FireDepartment;
      const shift = await installation.getShift(); // eslint-disable-line no-await-in-loop
      console.log(`${fd.name}: currently ${moment.tz(fd.timezone)}, shift: ${shift.shift}`);
    }
  }, 5000);
};

run();
