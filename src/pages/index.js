import { useState } from 'react';
import dynamic from 'next/dynamic';
import Meta from 'components/common/partials/Metadata';
import LayoutLoggedOut from 'components/common/layout/LayoutLoggedOut';
import Page from 'components/modules/static/Home';

const SignUpModal = dynamic(() => import('components/modules/signup/Modal'));

const Home = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const sendSlackSignUpMessage = async (action) => {
    const message = {
      message: `HOMEPAGE: Someone has clicked ${action} button`,
    };

    fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  return (
    <>
      <Meta
        title="The Full Stack | Discover and connect with developers sharing their work."
        description="A community and network to discover and connect with developers around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <LayoutLoggedOut setShowSignupModal={setShowSignupModal}>
        <Page
          setShowSignupModal={setShowSignupModal}
          sendSlackSignUpMessage={sendSlackSignUpMessage}
        />
      </LayoutLoggedOut>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default Home;

// export default withAuthUser({
//   whenAuthed: AuthAction.REDIRECT_TO_APP,
//   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
//   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
//   whenUnauthedAfterInit: AuthAction.RENDER,
//   LoaderComponent: Loader,
// })(Home);
