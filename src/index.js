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
      },
      FireDepartment:{
        fd_id: '76000',
        name: 'Richmond Fire and Emergency Services',
        state: 'VA',
        firecares_id: '93345',
        timezone: 'US/Eastern',
      }
    }, {
      _id: 26,
      app__id: 21,
      fire_department__id: 1533,
      App: {
        _id: 21,
        name: 'Whos On App',
        slug: 'whoson',
      },
      FireDepartment: {
        _id: 1533,
        fd_id: '11001',
        name: 'Washington DC Fire & EMS Department',
        state: 'DC',
        firecares_id: '98606',
        timezone: 'US/Eastern',
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
