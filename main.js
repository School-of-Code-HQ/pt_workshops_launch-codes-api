const result = document.querySelector("#result");

// The solvePuzzle function runs all of the functions which will lead to the final launch code submission.

async function solvePuzzle() {
  const launchCodeSubmission = await submitLaunchCodes("LAUNCH");
  result.src = launchCodeSubmission.img;
}

// The submitLaunchCodes function posts the launch codes to the API - THIS FUNCTION IS VERY INCOMPLETE - you need to fix it.

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
