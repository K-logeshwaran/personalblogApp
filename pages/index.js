import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useUserContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import Card from "@/components/card";

function getRelativeDate(date) {
  const formatter = new Intl.RelativeTimeFormat("en", {
    style: "long",
    numeric: "auto",
  });

  let num = new Date() - new Date(date);
  let daysPassed = -num / (24 * 60 * 60 * 1000);
  let monthsPassed = -num / (24 * 60 * 60 * 1000 * 30);
  let year = -num / (24 * 60 * 60 * 1000 * 30 * 12);
  if (daysPassed * -1 < 32) {
    return formatter.format(Math.floor(daysPassed), "day");
  } else {
    if (monthsPassed * -1 < 12) {
      // console.log(true);
      // console.log(monthsPassed);
      return formatter.format(Math.floor(monthsPassed), "month");
    } else {
      // console.log(true);
      return formatter.format(Math.floor(year), "year");
    }
  }
}

export default function Home({ posts }) {
  const [th, setTH] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cat, setCat] = useState("");
  const { theme } = useUserContext();
  useEffect(() => {
    function decideTheme() {
      if (theme === "light") return styles.light;
      return styles.dark;
    }
    setTH(decideTheme());
  }, [theme]);
  // console.log(posts);
  return (
    <>
      <Head>
        <title>Logesh Blog's</title>
        <meta name="description" content="My Personal and technical blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="refresh" content="7200" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      {/* ${styles.main} */}
      <main className={` grid-container`}>
        <NavBar />
        <section className={styles.holder}>
          <section className={styles.option}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <button
                onClick={() => setCat("personal")}
                className={`${styles.btns} ${th}`}
              >
                Personal
              </button>
              <button
                onClick={() => setCat("tech")}
                className={`${styles.btns} ${th}`}
              >
                Technical
              </button>
              <button
                onClick={() => setCat("web")}
                className={`${styles.btns} ${th}`}
              >
                Web
              </button>
              <button
                onClick={() => setCat("react")}
                className={`${styles.btns} ${th}`}
              >
                React
              </button>
              <button
                onClick={() => setCat("next")}
                className={`${styles.btns} ${th}`}
              >
                Next
              </button>
              <button
                onClick={() => setCat("go")}
                className={`${styles.btns} ${th}`}
              >
                Go
              </button>
              <button
                onClick={() => setCat("")}
                className={`${styles.btns} ${th}`}
              >
                All
              </button>
              <span className={`${styles.btns} ${th}`}>
                 {posts.length}
              </span>
            </div>
          </section>
          <section className={`${styles.section} article`}>
            {posts
              .sort((a, b) => {
                return (
                  new Date(b.frontmatter?.uploaded_at) -
                  new Date(a.frontmatter?.uploaded_at)
                );
              })
              .filter((post) =>
                post.frontmatter?.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .filter((post) => post.frontmatter.catagory?.includes(cat))

              .map((post) => (
                <Card
                  slug={post.slug}
                  uploaded_at={getRelativeDate(post.frontmatter?.uploaded_at)}
                  caption={post.frontmatter?.caption}
                  title={post.frontmatter?.title}
                  cover_image={post.frontmatter?.cover_image}
                  time={post.frontmatter?.time}
                  key={post.frontmatter?.title}
                />
              ))}
          </section>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  console.log();
  const { readdirSync, readFileSync } = require("fs");
  const path = require("path");
  const matter = require("gray-matter");
  const loc = path.resolve(process.cwd(), "articles");
  const files = readdirSync(loc);
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = readFileSync(path.join(loc, filename), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  // console.log(posts);
  return {
    props: {
      posts: posts,
    },
  };
}
