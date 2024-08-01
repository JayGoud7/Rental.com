"use client";

const error = ({ error, reset }) => {
  return (
    <div className="error">
      <h1>Something went wrong.please try again later</h1>
      <button onClick={() => reset()}>Click Here</button>
    </div>
  );
};

export default error;
