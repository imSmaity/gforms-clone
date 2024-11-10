"use client";
import AddQuestion from "@/components/card/AddQuestion";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import { getActiveForm } from "@/lib/redux/form/thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/user/userSlice";
import { socket } from "@/utils/socket";
import { Box, LinearProgress } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { v1 as uuid } from "uuid";

export default function Form() {
  const user = useAppSelector(selectUser);
  const { form, getAsyncStatus } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const [questions, setQuestions] = useState([{ id: uuid() }]);
  const [isConnected, setIsConnected] = useState(false);

  const params = useParams();
  const formId = String(params?.id);
  const userId = user._id;
  const isLoading =
    getAsyncStatus === STATUS.PENDING || getAsyncStatus === STATUS.IDLE;

  useLayoutEffect(() => {
    if (userId && formId) dispatch(getActiveForm({ _id: formId, userId }));
  }, [userId, formId]);

  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
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

  // const testSendMsg = () => {
  //   if (isConnected) {
  //     socket.emit("req_save_form", {
  //       data: {
  //         _id: formId,
  //         userId: userId,
  //         title: form?.title,
  //       },
  //       id: socket.id,
  //     });
  //   } else {
  //     console.log("Socket not connected. Cannot send message.");
  //   }
  // };

  if (isLoading)
    return (
      <Box sx={{ pt: 15 }}>
        <LinearProgress />
      </Box>
    );

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
          <HeaderSlide title="" />
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
