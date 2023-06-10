import Icon from 'components/common/elements/Icon';
import { useRouter } from 'next/router';
import Link from 'next/link';

const topics = [
  {
    label: 'All topics',
    slug: '',
    icon: 'FiHash',
  },
  {
    label: 'Sparks',
    slug: 'spark',
    icon: 'FiZap',
  },
  {
    label: 'Braindumps',
    slug: 'post',
    icon: 'FiCloud',
  },
  {
    label: 'Frameworks',
    slug: 'frameworks',
    icon: 'FiMaximize',
  },
  {
    label: 'Utilities',
    slug: 'utilities',
    icon: 'FiTerminal',
  },
  {
    label: 'Articles',
    slug: 'article',
    icon: 'FiFileText',
  },
  {
    label: 'Polls',
    slug: 'poll',
    icon: 'FiPieChart',
  },
  {
    label: 'Tutorials',
    slug: 'tutorials',
    icon: 'FiYoutube',
  },
  {
    label: 'Learning',
    slug: 'learning',
    icon: 'FiBookOpen',
  },
  {
    label: 'Career advice',
    slug: 'career_advice',
    icon: 'FiBriefcase',
  },
  {
    label: 'Working remote',
    slug: 'working_remotely',
    icon: 'FiCast',
  },
  {
    label: 'My desk setup',
    slug: 'desk_setup',
    icon: 'FiMonitor',
  },
  {
    label: 'Design tips',
    slug: 'design_tips',
    icon: 'FiDroplet',
  },
  {
    label: 'Memes',
    slug: 'meme',
    icon: 'FiSmile',
  },
  {
    label: 'Project ideas',
    slug: 'project_ideas',
    icon: 'FiLoader',
  },
  {
    label: 'Pair up',
    slug: 'collabs',
    icon: 'FiUsers',
  },
];

const Topics = ({ topic }) => {
  const router = useRouter();

  return (
    <div className="sticky top-20 rounded-md px-6 pt-4">
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-lg font-semibold">Filter by #topic</span>
      </div>

      <div className="grid w-48 grid-cols-1 gap-1">
        {topics.map((item, index) => (
          <Link href={`/hangout/${item.slug}`} passHref key={index}>
            <a
              href="#"
              className={
                'btn btn-with-icon whitespace-nowrap bg-transparent dark:bg-transparent ' +
                (topic === item.slug ? 'btn-pill-active' : 'btn-pill')
              }
            >
              <Icon name={`${item.icon}`} />
              <span className="relative">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;
