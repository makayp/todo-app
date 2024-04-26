function day() {
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}

function SubHeader() {
  return (
    <div>
      <h1 className='subtitle'>{day()}</h1>
    </div>
  );
}

export default SubHeader;
