async function solvePuzzle() {
  const logs = await getLogs();
  const firstSuspectId = logs[5].who;
  const firstSuspectDetails = await getPersonDetails(firstSuspectId);
  const firstSuspectMessages = await getMessages(firstSuspectId);
  const dog = await getDog();
  const launchCodeSubmission = await submitLaunchCodes(dog.name.toUpperCase());
  console.log(launchCodeSubmission);
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
  for (let i = 1; i <= 12; i++) {
    const response = await fetch(
      `https://task-escape-api.herokuapp.com/api/personnel/${i}`
    );
    const person = await response.json();
    if (person.species.toLowerCase() === "dog") {
      return person;
    }
  }
}

async function submitLaunchCodes(code) {
  const codeSubmission = { enter: code };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(codeSubmission),
  };

  const response = await fetch(
    "https://task-escape-api.herokuapp.com/api/codes",
    requestOptions
  );

  const success = await response.json();
  return success;
}

solvePuzzle();
