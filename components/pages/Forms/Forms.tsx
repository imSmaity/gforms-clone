"use client";
import { useQuery } from "@tanstack/react-query";
import Api from "@/Api";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/user/userSlice";
import { Box } from "@mui/material";
import FormCard from "@/components/card/FormCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IForm } from "@/lib/redux/form/types";
import Verify from "../auth/AlertSignIn";
import AlertSignIn from "../auth/AlertSignIn";

const Forms = () => {
  const user = useAppSelector(selectUser);
  const [data, setData] = useState<IForm[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { isLoading, data } = useQuery({
  //   queryKey: [user?._id],
  //   queryFn: () => {
  //     if (!user._id) return Promise.reject("User not found");
  //     else return Api.getForms({ userId: user._id });
  //   },
  // });
  //use react query

  useEffect(() => {
    // Api.getForms({ userId: user._id })
    //   .then((res: any) => {
    //     setData(res.data);
    //   })
    //   .catch(console.log);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <AlertSignIn />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pt: 15,
        gap: 2,
      }}
    >
      {data?.map((form) => (
        <Link
          href={`/forms/${form?._id}`}
          key={form._id}
          style={{ textDecoration: "none" }}
        >
          <FormCard title={form?.title} />
        </Link>
      ))}
    </Box>
  );
};

export default Forms;
