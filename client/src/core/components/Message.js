export function SelfMessage({ comment }) {
  const { userName, content, timeSent } = comment;
  console.log(timeSent);
  return (
    <div className="container-message">
      <div className="message-blue">
        <p className="message-content">
          {" "}
          <b>{`${userName}`}</b>: {`${content}`}
        </p>
        <div className="message-timestamp-left">SMS {timeSent}</div>
      </div>
    </div>
  );
}

export function Message({ comment }) {
  const { userName, content, timeSent } = comment;

  return (
    <div className="container-message">
      <div className="message-orange">
        <p className="message-content">
          <b>{`${userName}`}</b>: {`${content}`}
        </p>
        <div class="message-timestamp-left">SMS {timeSent}</div>
      </div>
    </div>
  );
}
