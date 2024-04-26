function getDay() {
  const today = new Date();
  const date = today.getDate();
  let suffix;
  switch (date % 10) {
    case 1:
      suffix = "st";
      break;
    case 2:
      suffix = "nd";
      break;
    case 3:
      suffix = "rd";
      break;
    default:
      suffix = "th";
  }

  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };

  return `${today.toLocaleDateString("en-US", options)}${suffix}`;
}

function SubHeader() {
  return (
    <div className='subheader'>
      <h1 className='subtitle'>{getDay()}</h1>
    </div>
  );
}

export default SubHeader;
