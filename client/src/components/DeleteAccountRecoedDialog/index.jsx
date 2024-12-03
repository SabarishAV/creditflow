import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./style.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getUserId from "../../middleware/getUserId";
import axios from "axios";
import Cookie from "js-cookie";

// eslint-disable-next-line react/prop-types
const DeleteAccountRecoedDialog = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const deleteAccountRecord = async () => {
    const userId = getUserId();
    const token = Cookie.get("token");
    await axios.delete(
      `${import.meta.env.VITE_BE_URL}/accountrecords/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
  };

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        className={style.deleteButton}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <DeleteOutlineIcon style={{ paddingBottom: "0.2rem" }} />
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want to Delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deleting this client, information about their transactions will
            also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={(e) => {
              deleteAccountRecord();
              handleClose(e);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteAccountRecoedDialog;
