"use client";
import AddQuestion from "@/components/card/AddQuestion";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { useAppSelector } from "@/lib/redux/hooks";
import { socket } from "@/utils/socket";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

export default function Form() {
  const [questions, setQuestions] = useState([{ id: uuid() }]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const form = useAppSelector((state) => state.formSlice);

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
    socket.on("disconnect", onDisconnect);

    if (socket.id) {
      socket.emit("join_chat", {
        name: "Next Client",
        id: socket.id,
      });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function onReceivedMsg(msg: string) {
      console.log("Message from server:", msg);
    }

    socket.on("received_message", onReceivedMsg);
    socket.on("res_save_form", onReceivedMsg);

    return () => {
      socket.off("received_message", onReceivedMsg);
      socket.off("res_save_form", onReceivedMsg);
    };
  }, []);

  const addQuestions = () => setQuestions([...questions, { id: uuid() }]);

  const testSendMsg = () => {
    if (isConnected) {
      socket.emit("req_save_form", {
        data: {
          _id: "6729ceb8b975b3a6c2f964be",
          userId: "6728bd60086d85311afdddfb",
          title: form.title,
        },
        id: socket.id,
      });
    } else {
      console.log("Socket not connected. Cannot send message.");
    }
  };

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
        <Button onClick={testSendMsg}>Submit...</Button>
      </main>
    </div>
  );
}
