const isAgeBelow10Years = (birthdate) => {
  const today = new Date();
  const birthdateObj = new Date(birthdate);

  // Calculate the age difference in milliseconds
  const ageDifference = today - birthdateObj;

  // Convert the age difference to years
  const ageInYears = ageDifference / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears < 10;
};

module.exports = isAgeBelow10Years;
