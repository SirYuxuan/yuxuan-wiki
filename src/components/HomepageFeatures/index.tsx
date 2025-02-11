import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '知识积累',
    description: (
      <>
        记录学习过程中的心得体会，分享技术经验和解决方案，构建个人知识体系。
      </>
    ),
  },
  {
    title: '生活记录',
    description: (
      <>
        分享生活中的点点滴滴，记录美好时刻，留下成长的足迹。
      </>
    ),
  },
  {
    title: '持续更新',
    description: (
      <>
        保持学习的热情，不断探索新的技术领域，持续更新知识库内容。
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
