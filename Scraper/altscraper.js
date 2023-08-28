const fetch = require("node-fetch");

const url = "https://prod-public-api.livescore.com/v1/api/app/date/soccer/20230828/2?countryCode=SE&locale=en&MD=1";

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    const events = data.Stages.flatMap(league =>
      league.Events.map(event => ({
        league: league.Snm,
        country: league.Cnm,
        home: event.T1[0].Nm,
        away: event.T2[0].Nm,
        homeTeamScore: +event.Tr1,
        awayTeamScore: +event.Tr2,
        status: event.Eps,
        time: event.Esd.toString()
          .replace(
            /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/g,
            (...args) =>
              `${args.slice(1, 4).join(".")} ${args.slice(4, 7).join(":")}`
          ),
      }))
    );

    return events; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getData;
