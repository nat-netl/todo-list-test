export const date = (separate) => {
  let newDate = new Date();
  return (
    newDate.getFullYear() +
    separate +
    (newDate.getMonth() + 1) +
    separate +
    newDate.getDate()
  );
};
