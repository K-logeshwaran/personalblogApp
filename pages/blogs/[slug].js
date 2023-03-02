import NavBar from "@/components/navbar";
import matter from "gray-matter";
import md from "markdown-it";
import { useUserContext } from "@/context/AppContext";
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

function Blogs({ post }) {
  const ISSERVER = typeof window === "undefined";
  //console.log({ frontMatter, slug, content });
  useEffect(() => {
    if (!ISSERVER) {
      hljs.highlightAll(); // apply highlighting
    }
  }, []);
  const { theme } = useUserContext();
  function decideTheme() {
    if (theme === "light") return "black";
    return "#EEEEEE";
  }
  return (
    <>
    <Head>
      <title>{post.frontMatter.title}</title>
      <meta charSet="UTF-8"/>
      <meta name="author" content="yourDevLoki"/>
      <meta name="description" content={`${post.frontMatter?.meta_desc}`}/>
      <meta name="keywords" content={`${post.frontMatter?.meta_keywords}`}/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
      <main className="main" >
        <NavBar />
        <section className="section">
          <Link href="/">
            <button className="button-3">Back</button>
          </Link>
          <article
            style={{ color: `${decideTheme()}` }}
            className="post-body"
            dangerouslySetInnerHTML={{ __html: md().render(post.content) }}
          />
        </section>
      </main>
    </>
  );
}

export default Blogs;

export async function getStaticPaths() {
  const { readdirSync } = require("fs");
  const path = require("path");
  const loc = path.resolve(process.cwd(), "articles");
  const files = readdirSync(loc);
  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(".md", ""),
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const path = require("path");
  const loc = path.resolve(process.cwd(), "articles");
  const { readFileSync } = require("fs");
  const filePath = path.join(loc, `${slug}.md`);
  const markDownWithMeta = readFileSync(filePath, "utf-8");
  const { data: frontMatter, content } = matter(markDownWithMeta);
  return {
    // Passed to the page component as props
    props: {
      post: {
        frontMatter,
        slug,
        content,
      },
    },
  };
}
