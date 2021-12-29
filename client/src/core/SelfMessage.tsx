import React from 'react';

const SelfMessage = function ({ comment }: { comment: Comment }) {
	const { userName, content, timeSent } = comment;
	return (
		<div className="container-message">
			<div className="message-blue">
				<p className="message-content">
					<b>{`${userName}`}</b>:{content}
				</p>
				<div className="message-timestamp-left">
					SMS
					{timeSent}
				</div>
			</div>
		</div>
	);
};

export default SelfMessage;
