"use client";
import AddQuestion from "@/components/card/AddQuestion";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { socket } from "@/utils/socket";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

export default function Home() {
  const [questions, setQuestions] = useState([{ id: uuid() }]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  console.log(isConnected, transport);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    if (socket.id)
      socket.emit("join_chat", {
        name: "XYZ",
        id: socket.id,
      });
    socket.on("disconnect", onDisconnect);

    setTimeout(() => {
      socket.emit("send_message", { id: socket.id, name: "XYZ" });
    }, 3000);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function onReceivedMsg(msg: string) {
      console.log("msggg:", msg);
    }

    socket.on("received_message", onReceivedMsg);
    return () => {
      socket.off("received_message", onReceivedMsg);
    };
  }, [socket]);

  const addQuestions = () => setQuestions([...questions, { id: uuid() }]);

  return (
    <div>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 15,
            gap: 2,
          }}
        >
          <HeaderSlide />
          {questions.map((question) => (
            <QuestionSlide key={question.id} />
          ))}
          <Box sx={{ position: "fixed", left: "78%", bottom: 10 }}>
            <AddQuestion handleAddQuestions={addQuestions} />
          </Box>
        </Box>
      </main>
    </div>
  );
}
