import styles from "./TextInput.module.css";

export default function TextInput({ setRoomId }) {
  return (
    <div className={styles["text-input"]}>
      <input onChange={(e) => setRoomId(e.target.value)} />
    </div>
  );
}

// <div className={styles[""]}></div>
