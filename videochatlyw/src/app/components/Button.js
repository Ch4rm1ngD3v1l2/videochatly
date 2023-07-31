import styles from "./Button.module.css";

export default function Button({ title, color, textColor, onClick }) {
  return (
    <div className={styles["button"]} style={{ backgroundColor: color, color: textColor }} onClick={onClick}>
      {title}
    </div>
  );
}

// <div className={styles[""]}></div>
