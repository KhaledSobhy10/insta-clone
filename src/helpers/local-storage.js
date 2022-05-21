export function getValue(itemKey) {
  let strObject = localStorage.getItem(itemKey);
  console.log("strObject", strObject);
  if (strObject) return JSON.parse(strObject);
  else return null;
}

export function addValue(itemKey, itemObject) {
  localStorage.setItem(itemKey, JSON.stringify(itemObject));
}

export function removeValue(itemKey) {
  localStorage.removeItem(itemKey);
}
