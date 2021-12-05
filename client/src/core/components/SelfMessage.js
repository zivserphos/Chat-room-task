export function SelfMessage({ comment }) {
  const { userName, content, timeSent } = comment;
  return (
    <div className="container-message">
      <div className="message-blue">
        <p className="message-content">
          <b>{`${userName}`}</b>: {content}
        </p>
        <div className="message-timestamp-left">SMS {timeSent}</div>
      </div>
    </div>
  );
}
