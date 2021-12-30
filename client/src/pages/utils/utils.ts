const timeMessageSent = (): string => {
  const hours = new Date().getHours().toString();
  let minutes = new Date().getMinutes().toString();
  if (minutes.length === 1) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};

export default timeMessageSent;
