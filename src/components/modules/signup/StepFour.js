import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as ga from 'lib/ga';
import { SignUpSteps } from 'components/modules/signup/constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import Skills from 'components/modules/account/profile/Tech';

const StepFour = ({ user }) => {
  const router = useRouter();
  const AuthUser = useAuthUser();
  const [skillsSelected, setSkillsSelected] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (!skillsSelected) {
      alert('Select at least 3 skills');
      return;
    }

    const stepData = {
      signUpProcessStatus: SignUpSteps.SIGNUP_SKILLS_COMPLETED.param,
      completedOnBoarding: false,
    };
    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, stepData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 204) {
          ga.event({
            action: 'SIGNUP_SKILLS_COMPLETED',
          });
        }
        router.push('/account/signup/step5');
      })
      .catch((error) => {
        sendSlackMessage(`User had an error on step 4 of the sign up process`);
        router.push('/account/signup/step4');
      });
  }

  return (
    <div className="max-w-screen-xl mx-auto mb-14">
      <div className="sm:w-full flex justify-center">
        <div className="px-4 sm:px-0">
          <h2 className="text-lg text-slate-500 dark:text-slate-400 text-center">
            Select at least 3 below.
          </h2>
          <Skills user={user} setSkillsSelected={setSkillsSelected} />

          <div>
            <button
              type="submit"
              className="btn-primary py-3 w-full"
              onClick={onSubmit}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
