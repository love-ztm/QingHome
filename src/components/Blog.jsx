import { useSite } from '../context/SiteContext.jsx';
import Section from './Section.jsx';
import { IconArrow, IconExternal } from './Icons.jsx';

export default function Blog() {
  const { config } = useSite();
  const posts = config?.blogPosts || [];

  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title="浮生笔录"
      subtitle="风雨里走过的路与慢慢明白的事"
      icon="fa-solid fa-feather"
      action={
        <a className="section__link" href="https://blog.notett.com" target="_blank" rel="noreferrer">
          轻叩此门，入字里行间 <IconExternal size={14} />
        </a>
      }
    >
      <div className="blog">
        {posts.map((post, i) => (
          <a className="blog__item" href={post.url} key={i} target="_blank" rel="noreferrer">
            <div className="blog__meta">
              <span className="blog__date">{post.date}</span>
              {post.tags && post.tags.split(',').map((tag, j) => (
                <span className="blog__tag" key={j}>{tag.trim()}</span>
              ))}
            </div>
            <h3 className="blog__title">{post.title}</h3>
            <p className="blog__excerpt">{post.excerpt}</p>
            <span className="blog__more">
              观其全篇 <IconArrow size={14} />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
