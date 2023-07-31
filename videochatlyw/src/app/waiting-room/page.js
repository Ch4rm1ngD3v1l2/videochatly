"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import styles from "./page.module.css";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function WaitingRoom() {
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const joinRoom = () => {
    navigate(`/room?id=${roomId.trim()}`);
  };

  const createRoom = () => {
    navigate(`/room?id=${v4()}`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__wrapper"]}>
        <div className={styles["greeting"]}>VideoChatly</div>
        <div className={styles["description"]}>Өрөөний дугаар хуулж холбогдох эсвэл шинээр өрөө нээнэ үү</div>
        <TextInput setRoomId={setRoomId} />
        <Button title="Өрөөнд орох" onClick={joinRoom} />
        <Button title="Шинээр нээх" color="#6D67E4" textColor="white" onClick={createRoom} />
      </div>
    </div>
  );
}

// <div className={styles[""]}></div>
