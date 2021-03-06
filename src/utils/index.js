export const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
}; //Literally copy an array so we can use it to update a state

export const getDayOfTheYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

export const getDayKey = () => {
  const d = new Date();
  let year = d.getFullYear();
  return `day-${getDayOfTheYear() + 3}-${year}`;
};
