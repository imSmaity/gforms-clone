"use client";
import Api from "@/Api";
import FormCard from "@/components/card/FormCard";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import { IForm } from "@/lib/redux/form/types";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/user/userSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Card, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Forms = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?._id || "";
  const [data, setData] = useState<IForm[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const { isLoading, data } = useQuery({
  //   queryKey: [user?._id],
  //   queryFn: () => {
  //     if (!user._id) return Promise.reject("User not found");
  //     else return Api.getForms({ userId: user._id });
  //   },
  // });
  //use react query

  const fetchForms = (userId: string) => {
    setIsLoading(true);
    Api.getForms({ userId })
      .then((res: any) => {
        setData(res.data);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (user?._id) {
      fetchForms(user._id);
    }
  }, [user?._id]);

  const handleAddForm = () => {
    setIsLoading(true);
    const data = { userId };
    Api.saveForm(data)
      .then((res: any) => {
        const form = res.form;
        console.log(form?._id);
        if (form?._id) {
          router.push(`/forms/${form?._id}`);
        }
      })
      .catch(console.error);
  };

  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      <Navbar />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ p: 15, pt: 15 }}
      >
        <Grid item xs={2} sm={8} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 0,
              border: "1px solid #fbfbfb",
              borderColor: "#bbbbbb",
              borderRadius: "5px",
              width: "200px",
              height: "235px",
              cursor: "pointer",
            }}
            onClick={handleAddForm}
          >
            <AddOutlinedIcon sx={{ width: 70, height: 70, opacity: 0.5 }} />
          </Card>
        </Grid>
        {data?.map((form) => (
          <Grid item xs={2} sm={4} md={3} key={form._id}>
            <Link
              href={`/forms/${form?._id}`}
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              <FormCard title={form?.title} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Forms;
