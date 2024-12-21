"use client";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectResponder } from "@/lib/redux/responder/responderSlice";
import { logout, selectUser } from "@/lib/redux/user/userSlice";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import { Button } from "@mui/material";
import ShareModal from "../modal/ShareModal";

interface INavbar {
  isEditView?: boolean;
  isViewForm?: boolean;
}

const Navbar = React.memo(({ isEditView, isViewForm }: INavbar) => {
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { form, asyncSaveForm, asyncSaveQuestion } = useAppSelector(selectForm);
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { saveAnswerAsync } = useAppSelector(selectResponder);
  const pathname = usePathname();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const handleOpenShare = {
    open() {
      setOpenShareModal(true);
    },
    close() {
      setOpenShareModal(false);
    },
  };

  const settings = [{ title: "Logout", handleClick: handleLogout }];

  const isFormSaving =
    asyncSaveForm === STATUS.PENDING ||
    asyncSaveQuestion == STATUS.PENDING ||
    saveAnswerAsync === STATUS.PENDING;

  return (
    <AppBar
      color="default"
      sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: isViewForm ? "none" : "flex",
              visibility: isEditView ? "initial" : "hidden",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Logo />
            <Typography sx={{ color: "#000000", fontSize: 20 }}>
              {form?.title}
            </Typography>
            {isFormSaving ? (
              <CloudSyncOutlinedIcon />
            ) : (
              <CloudDoneOutlinedIcon />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              sx={{
                display: isEditView ? "block" : "none",
                px: 3,
                textTransform: "none",
              }}
              onClick={handleOpenShare.open}
            >
              Send
            </Button>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name} src={user?.picture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.handleClick}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <ShareModal open={openShareModal} handleClose={handleOpenShare.close} />
    </AppBar>
  );
});
export default Navbar;
