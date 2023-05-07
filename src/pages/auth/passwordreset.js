import { React, useState } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import ResetPassword from 'components/modules/auth/ResetPassword';
import ResetEmail from 'components/modules/auth/ResetEmail';

const PasswordResetPage = () => {
  const [showPWReset, setShowPWReset] = useState(true);
  const [showEmailSend, setShowEmailSend] = useState(false);

  return (
    <>
      <Meta
        title={`${process.env.brandName} - Discover opportunities`}
        desc="The network built for Software Engineers"
        keywords=""
      />
      <Layout>
        <main className="dark:bg-dovegray-900 pb-20 mx-auto max-w-full">
          <div className="flex-grow w-full max-w-full mx-auto relative">
            <div className="max-w-full mx-auto">
              <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-8">
                {showPWReset && (
                  <ResetPassword
                    hidePWReset={setShowPWReset}
                    showEmailSend={setShowEmailSend}
                  />
                )}
                {showEmailSend && <ResetEmail />}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default PasswordResetPage;
