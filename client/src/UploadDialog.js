import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

const themes = makeStyles((theme) => ({
  button: {
    color: "#000",
  },
  dropzone: {
    backgroundColor: "#bdbdbd",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    padding: "40px",
  },
  dropzoneText: {
    fontWeight: "bold",
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  image: {
    display: "block",
    idth: theme.spacing(25),
    height: theme.spacing(25),
  },
  primaryButton: {
    backgroundColor: "#FF743D",
    color: "#fff",
    textTransform: "none",
    margin: "1em 0 1em 0",
    borderRadius: "0 0 0 0",
    "&:hover": {
      backgroundColor: "#AD6800",
    },
  },
  secondaryButton: {
    textTransform: "none",
    margin: "1em 0 1em 0",
    borderRadius: "0 0 0 0",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
}));

function UploadDialog(props) {
  const [files, setFiles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    multiple: false,
  });

  const handleImageUpload = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", files[0]);

    if (files[0]) {
      console.log(files[0])
      //validate image extension
      const file = formdata.get("image");
      if (!(file.type === "image/jpeg" || file.type === "image/png")) {
        setMessageOpen(true);
        setMessage("Only .jpeg and .png files accepted");
        return;
      }
    }
    else {
      setMessageOpen(true);
      setMessage("Please upload an image");
      return;
    }

    const url = new URL("http://localhost:3001/");
    if (props.id && props.avatarUpload) {
      url.pathname = "upload/profile/" + props.id;
    }
    else if (props.id && !props.avatarUpload) {
      url.pathname = "upload/recipe/" + props.id;
    }
    else {
      // dont upload
      return;
    }
    const requestOptions = {
      method: "POST",
      body: formdata,
    };
      fetch(url.toString(), requestOptions)
        .then((response) => { 
          if (response.status == 200) {
            //Maybe need to refresh or redirect somewhere.
            setMessageOpen(true);
            setMessage("Upload success");
          }
          else {
            setMessageOpen(true);
            setMessage("Upload failed, please try again later")
          }
        })
        .catch((error) => {
          console.log("error", error);
          setMessageOpen(true);
          setMessage("Upload failed, please try again later");
        });
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const classes = themes();
  return (
    <Grid>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Open
      </Button>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={dialogOpen}
        onClose={handleClose}
      >
        {props.avatarUpload ? (
          <DialogTitle id="simple-dialog-title">
            Upload a New Profile Picture
          </DialogTitle>
        ) : (
          <DialogTitle id="simple-dialog-title">
            Upload a Recipe Picture
          </DialogTitle>
        )}

        <form onSubmit={handleImageUpload}>
          <DialogContent>
            {messageOpen ? <Typography>{message}</Typography> : <span />}
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Button className={classes.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Typography className={classes.dropzoneText}>
                    Drop an image here or click to select an image
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                {props.avatarUpload ? (
                  <Avatar
                    className={classes.avatar}
                    src={files.length !== 0 ? files[0].preview : ""}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className={classes.image}
                    src={files.length !== 0 ? files[0].preview : ""}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button className={classes.secondaryButton} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={classes.primaryButton} type="submit">
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
}

export default UploadDialog;
