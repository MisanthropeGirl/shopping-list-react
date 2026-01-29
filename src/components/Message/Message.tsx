import classNames from "classnames";
import type { Feedback } from "../../typings";

interface MessageProps {
  feedback: Feedback | null;
}

function Message({ feedback }: MessageProps) {
  if (!feedback) return;

  const messageClasses = classNames("msg", { "msg-error": feedback && feedback.type === "error" });

  // Should have this vanish after a period
  return (
    <p className={messageClasses} data-testid="feedback">
      {feedback.msg}
    </p>
  );
}

export default Message;
