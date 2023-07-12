import firebase from 'firebase/app';
import 'firebase/auth';
import Link from 'next/link';
import Icon from 'components/common/elements/Icon';
import Highlight from 'components/modules/home/Highlight';
import Discover from 'components/modules/home/Discover';
import ProjectCarousel from 'components/modules/home/ProjectCarousel';
import { CategoriesFilter } from 'components/modules/explore/constants';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';

export const Greeting = ({ name }) => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const firstName = name.split(' ');
  let greet = '';

  if (hours < 12) greet = 'Good morning';
  else if (hours >= 12 && hours <= 17) greet = 'Good afternoon';
  else if (hours >= 17 && hours <= 24) greet = 'Good evening';

  return (
    <div className="w-min font-mono text-base">
      <div className="greeting-line anim-typewriter flex">
        <span>
          {greet},<span className="capitlize">{firstName[0]}</span>...
        </span>
        <span className="hidden lg:block">
          check these out{' '}
          <Icon name="FiCornerRightDown" className={'inline-flex'} />
        </span>
      </div>
    </div>
  );
};

const Main = ({ user }) => {
  const router = useRouter();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(googleProvider);
      if (res) router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(gitHubProvider);
      if (res) router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen space-y-8 px-4 pt-6">
      {!user && (
        <div className="rounded-lg bg-transparent dark:bg-transparent">
          <div className="mx-auto max-w-4xl py-14 text-center">
            <div className="relative space-y-10">
              <h2 className="font-manrope text-6xl font-extrabold tracking-tighter text-base-800 dark:text-base-200 xl:text-8xl">
                Unleash your{' '}
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Developer
                </span>{' '}
                projects.
              </h2>
              <h4 className="mx-auto max-w-2xl text-base font-light tracking-tight text-base-500 dark:text-base-400 xl:text-2xl">
                The Full Stack is an open source platform for developers to
                share projects and grow your developer network.
              </h4>
              <div className="flex flex-col items-center justify-center space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4">
                <button
                  className="btn btn-secondary btn-with-icon rounded-full py-2"
                  onClick={signInWithGitHub}
                >
                  <Icon name="SiGithub" pack="Si" className="h-5 w-5" />
                  <span>Continue with GitHub</span>
                </button>
                <button
                  className="btn btn-secondary btn-with-icon rounded-full py-2"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative pb-10">
        {user && <Greeting name={user?.name} />}
        <Highlight />
      </div>

      <div className="pb-10">
        <Discover user={user} sort="newest" range={90} />
      </div>

      <ProjectCarousel
        title="Popular projects with the community"
        sort={'mostpopular'}
        range={365}
        count={15}
        showMore={'/explore/popular'}
      />

      <ProjectCarousel
        title="Recently added projects"
        sort={'newest'}
        range={30}
        count={15}
        showMore={'/explore/new'}
      />

      <ProjectCarousel
        title="Projects open to collaboration"
        sort={'mostpopular'}
        category={{
          label: 'Open to Collaboration',
          slug: 'opentocollab',
          term: 'opentocollab',
          title: 'Projects open to collaboration',
          desc: 'Discover and connect to developers actively looking for collaborators',
        }}
        range={90}
        count={15}
        showMore={'/explore/popular/opentocollab'}
      />

      <ProjectCarousel
        title="Awesome apps you'll like"
        sort={'mostpopular'}
        category={{
          label: 'Apps',
          slug: 'apps',
          term: 'apps',
          title: 'Full stack apps projects',
          desc: 'Cool apps built by the community',
        }}
        range={90}
        count={15}
        showMore={'/explore/popular/apps'}
      />

      <ProjectCarousel
        title="Games projects you'll like"
        sort={'mostpopular'}
        category={{
          label: 'Games',
          slug: 'games',
          term: 'games',
          title: 'Games',
          desc: '',
        }}
        range={365}
        count={15}
        showMore={'/explore/popular/games'}
      />

      <ProjectCarousel
        title="Dev tools projects"
        sort={'mostpopular'}
        category={{
          label: 'Tools',
          slug: 'tools',
          term: 'tools',
          title: '',
          desc: '',
        }}
        range={90}
        count={15}
        showMore={'/explore/popular/tools'}
      />

      <ProjectCarousel
        title="Open Source projects"
        sort={'mostpopular'}
        category={{
          label: 'Open Source',
          slug: 'opensource',
          term: 'open source',
          title: '',
          desc: '',
        }}
        range={365}
        count={15}
        showMore={'/explore/popular/opensource'}
      />

      <div className="space-y-3 pb-20">
        <div className="flex items-center space-x-2">
          <Icon name="FiTerminal" />
          <h3 className="font-mono text-base font-medium text-base-700 dark:text-base-200">
            Browse by category
          </h3>
        </div>
        <div className="no-scrollbar mt-6 flex flex-wrap gap-4">
          {CategoriesFilter.map(
            (item, index) =>
              item.slug !== 'datascience' && (
                <Link href={`/explore/popular/${item.slug}`} key={index}>
                  <div className="group flex h-32 w-72 grow cursor-pointer flex-col justify-between rounded-lg border border-base-200 bg-base-100 p-4 text-left duration-200 hover:border-base-700 hover:bg-base-50 dark:border-base-700 dark:bg-base-900 dark:hover:border-base-100 dark:hover:bg-base-900 xl:max-w-[350px]">
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-base-700 group-hover:text-base-700 dark:text-base-200 dark:group-hover:text-base-100">
                        {item.label}
                      </span>
                      <span className="text-sm text-base-300 dark:text-base-400">
                        {item.desc}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Icon
                        name={'FiChevronRight'}
                        className="text-base-300 dark:text-base-400"
                      />
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
