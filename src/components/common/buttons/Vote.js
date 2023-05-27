import axios from 'axios';
import { useState } from 'react';
import * as ga from 'lib/ga';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from '../elements/Icon';

const ButtonVote = ({ user, post }) => {
  const postId = post._id || post.projectId;
  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser || false);
  const [refreshLikes, setRefreshLikes] = useState(post?.numberOfLikes);

  const handleVote = async () => {
    setIsLiked(!isLiked);
    setRefreshLikes(!isLiked ? refreshLikes + 1 : refreshLikes - 1);

    const data = {
      projectId: postId,
    };

    if (!isLiked) {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/like`,
        data
      );

      ga.event({
        action: 'user_project_liked',
      });
      sendSlackMessage(`Upvoted the project titled '${post.projectName}'`);
    } else {
      await axios.post(
        `${process.env.BASEURL}/api/projects/project/unlike`,
        data
      );

      ga.event({
        action: 'user_project_unliked',
      });
      sendSlackMessage(
        `Removed their vote on the project titled '${post.projectName}'`
      );
    }
  };

  return (
    <button
      className="btn-secondary btn-with-icon group group relative space-x-1 rounded-xl bg-transparent pl-0 pr-2 text-sm hover:bg-tfstertiary-600/10 sm:hover:text-green-400"
      onClick={() => handleVote()}
    >
      <ToolTip message="Upvote" />
      {isLiked ? (
        <>
          <Icon name={'FiHeart'} className="h-5 w-5 text-red-500" />
          <span className="text-white">{Math.abs(refreshLikes)}</span>
        </>
      ) : (
        <>
          <Icon
            name={'FiHeart'}
            className="h-6 w-6 sm:group-hover:text-green-400"
          />
          <span>{Math.abs(refreshLikes)}</span>
        </>
      )}
    </button>
  );
};

export default ButtonVote;
