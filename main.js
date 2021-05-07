const result = document.querySelector("#result");

async function solvePuzzle() {
  const logs = await getLogs();
  const firstSuspectId = logs[5].who;
  const firstSuspectDetails = await getPersonDetails(firstSuspectId);
  const firstSuspectMessages = await getMessages(firstSuspectId);
  const dog = await getDog();
  const launchCodeSubmission = await submitLaunchCodes("LAUNCH");
  result.src = launchCodeSubmission.img;
}

async function getLogs() {
  const response = await fetch(
    "https://task-escape-api.herokuapp.com/api/logs"
  );
  const logs = await response.json();
  return logs;
}

async function getPersonDetails(id) {
  const response = await fetch(
    `https://task-escape-api.herokuapp.com/api/personnel/${id}`
  );
  const person = await response.json();
  return person;
}

async function getMessages(id) {
  const response = await fetch(
    `https://task-escape-api.herokuapp.com/api/messages?to=${id}`
  );
  const messages = await response.json();
  return messages;
}

async function getDog() {
  let promises = [];

  for (let i = 1; i <= 12; i++) {
    const person = await getPersonDetails(i);
    if (person.species.toLowerCase() === "dog") {
      return person;
    }
  }

  const crew = await Promise.resolve(promises);
  console.log(crew);
}

async function submitLaunchCodes(code) {
  let requestOptions = {
    method: "POST",
  };

  const response = await fetch(
    "https://task-escape-api.herokuapp.com/api/codes",
    requestOptions
  );

  const result = await response.json();
  return result;
}

solvePuzzle();
