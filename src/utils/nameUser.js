export function formatUserName(fullName) {
  const firstName = fullName.split(" ")[0];
  const nameFormated =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const firstLetter = firstName[0] || "";
  const thirdLetter = firstName[2] || "";
  const initials = (firstLetter + thirdLetter).toUpperCase();

  return { nameFormated, initials };
}
