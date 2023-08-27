const url = "https://prod-public-api.livescore.com/v1/api/app/date/soccer/20230827/2?countryCode=SE&locale=en&MD=1";

async function getData() {
  
fetch(url)
.then(res => {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
})
.then(data => {
  const events = data.Stages.flatMap(league =>
    league.Events.map(event => ({
      league: league.Snm,
      country: league.Cnm,
      home: event.T1[0].Nm,
      away: event.T2[0].Nm,
      homeTeamScore: +event.Tr1,
      awayTeamScore: +event.Tr2,
      status: event.Eps,

      // optionally, parse the time
      time: event.Esd.toString()
        .replace(
          /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/g,
          (...args) =>
            `${args.slice(1, 4).join(".")} ${args.slice(4, 7).join(":")}`
        ),
    }))
  );
  console.log(events);
})
.catch(err => console.error(err));
};

getData();

module.exports = { getData };


