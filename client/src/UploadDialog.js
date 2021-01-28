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
  Avatar
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    const formdata = new FormData();
    formdata.append("image", files[0]);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    //To do: Need to catch errors properly to alert user in case upload goes wrong
    fetch("http://localhost:3001/upload/uploadpicture", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="simple-dialog-title">
          Upload a New Profile Picture
        </DialogTitle>
        <form onSubmit={handleImageUpload}>
          <DialogContent>
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
                <Avatar
                  className={classes.avatar}
                  src={files.length !== 0 ? files[0].preview : ""}
                  alt="avatar"
                />
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
