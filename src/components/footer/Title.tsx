import styles from "./scss/Footer.module.css";
import React from "react";

export function Title(props: {
    title: string
}) {
    return (
        <>
            <h6 className={`text-warning ${styles.title}`}>{props.title}</h6>
            <hr className={styles.line}/>
        </>
    )
}
