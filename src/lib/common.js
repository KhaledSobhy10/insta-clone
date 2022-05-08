export function getErrorMessageFromCode(firebaseCode) {
  const s1 = firebaseCode.split("/")[1].split("-");
  return s1.reduce((prevWord, currWord) => prevWord + " " + currWord, "");
}
