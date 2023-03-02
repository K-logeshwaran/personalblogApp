import styles from "@/styles/components.module.css"
import { useUserContext } from "@/context/AppContext";
import Link from "next/link";
import { useEffect, useState } from "react";


function Card({ title, caption, cover_image, time, slug ,uploaded_at:created_at}) {
    const [th, setTH] = useState(null);
    const { theme } = useUserContext();
    useEffect(() => {
        console.log(theme);
        function decideTheme() {
            if (theme === "light")
                return styles.whitecard
            return styles.darkcard
        }
        setTH(decideTheme())
    }, [theme])

    return (
        <section className={`${styles.card} ${th}`}>
            <div className={styles.top}>
                <Link href={`/blogs/${slug}`} className={styles.title}>{title}</Link>
                <h4>{created_at}</h4>
                <h4 className={styles.reder}><span className="material-symbols-outlined" style={{ "color": "blue" }}>
                    import_contacts
                </span>{time} min read</h4>
                <p className={styles.para}>{caption}...</p>
                <Link  style={{"color":"#0BAAFF","fontWeight":"bolder"}} href={`/blogs/${slug}`}>Read more</Link>

            </div>
            <div className={styles.bottom}>
                <img src={cover_image} className={styles.img} alt="" />
            </div>
        </section>
    );
}

export default Card;