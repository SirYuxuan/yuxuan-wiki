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
    title: '开放 API',
    description: (
      <>
        提供丰富的公共 API 接口，助力开发者快速实现功能，打造更好的应用。
      </>
    ),
  },
  {
    title: '技术分享',
    description: (
      <>
        分享 Rust 等技术的学习心得，探讨编程技巧，共同提高开发技能。
      </>
    ),
  },
  {
    title: '持续更新',
    description: (
      <>
        持续开发新的 API 接口，不断扩展功能，及时更新文档，提供更好的服务。
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
