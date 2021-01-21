import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  makeStyles,
  useEventCallback,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

const themes = makeStyles({
  button: {
    color: "#000",
  },
});

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
    accept: "image/*",
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

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} />
      </div>
    </div>
  ));

  const handleImageUpload = (event) => {
    var formdata = new FormData();
    formdata.append("image", files[0]);

    console.log(formdata.get("image"));

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://localhost:3001/upload/uploadpicture", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    event.preventDefault();
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
        <DialogTitle id="simple-dialog-title">Title</DialogTitle>
        <form onSubmit={handleImageUpload}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div>{thumbs}</div>
          <Button type="submit">Upload</Button>
        </form>
      </Dialog>
    </Grid>
  );
}

export default UploadDialog;
