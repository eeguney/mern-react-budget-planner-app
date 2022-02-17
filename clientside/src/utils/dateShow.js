const dateShow = (date) => {
  const editDate = date - 1;

  if (editDate > 0) {
    if (editDate <= 30) {
      return editDate + " days ago";
    }
    if (editDate > 30) {
      const month = editDate / 30;
      return month + " month ago";
    }
    if (editDate > 365) {
      const year = editDate / 365;
      return year + " year ago";
    }
  } else {
    return "Today";
  }
};

export default dateShow;
