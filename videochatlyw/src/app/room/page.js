"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function Room({ searchParams }) {
  useEffect(() => {
    const v_local = document.getElementById("v_local");
    const v_remote = document.getElementById("v_remote");

    // START - PC
    const pcConf = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun.stunprotocol.org:3478" }] };
    const pc = new RTCPeerConnection(pcConf);

    pc.onnegotiationneeded = async () => {};

    // FINISH - PC

    // START - SignalR
    const connection = new HubConnectionBuilder().withUrl("https://silent-heads-smile.loca.lt/chathub", { withCredentials: false }).build();

    connection.on("ReceiveMessage", (message) => {
      switch (message["type"]) {
        case "ready":
          console.log("Таны найз орж ирлээ");
          createOffer();
          break;
        case "offer":
          console.log("Танд хүсэлт ирлээ");
          handleOffer(message["data"]);
          break;
        case "answer":
          console.log("Танд хариулт ирлээ");
          handleAnswer(message["data"]);
          break;
        case "candidate":
          console.log("Танд candidate ирлээ");
          handleCandidate(message["data"]);
          break;
      }
    });

    connection
      .start()
      .then(() => {
        init();
        pc.onicecandidate = (event) => {
          console.log(event?.candidate);
          connection.invoke("SendMessage", { type: "candidate", data: event?.candidate });
        };

        pc.ontrack = (event) => {
          console.log("Friend stream", event.streams?.[0]);
          if (v_remote.srcObject != null) return;
          v_remote.srcObject = event.streams?.[0];
        };
      })
      .catch((err) => {
        console.log(err);
      });
    // FINISH - SignalR

    // START - Add Functions

    const createOffer = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        connection.invoke("SendMessage", { type: "offer", data: offer });
      } catch (e) {
        console.log(e);
      }
    };

    const handleOffer = async (offer) => {
      try {
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        connection.invoke("SendMessage", { type: "answer", data: answer });
      } catch (e) {
        console.log(e);
      }
    };

    const handleAnswer = async (answer) => {
      try {
        await pc.setRemoteDescription(answer);
      } catch (e) {
        console.log(e);
      }
    };

    const handleCandidate = (candidate) => {
      pc.addIceCandidate(candidate);
    };

    // FINISH - Add Functions

    // START - INIT
    const init = async () => {
      try {
        const stream = await navigator?.mediaDevices?.getUserMedia({ video: true, audio: true });
        console.log("My stream", stream);
        v_local.srcObject = stream;

        stream?.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        connection.invoke("SendMessage", { type: "ready" });
      } catch (e) {
        console.log(e);
      }
    };

    // FINISH - INIT
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__wrapper"]}>
        <video id="v_local" className={styles["video"]} autoPlay />

        <video id="v_remote" className={styles["video"]} autoPlay />
      </div>
    </div>
  );
}

// <div className={styles[""]}></div>

// try {
// } catch (e) {
//   console.log(e);
// }
