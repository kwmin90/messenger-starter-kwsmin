import { Box, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  button: {
    float: "right",
    width: 10,
  },
}));
const FileUpload = (props) => {
  const classes = useStyles();

  const handleSubmit = async ({ target }) => {
    try {
      const file = target.files[0];
      await axios
        .post("/api/fileupload", {
          name: file.name,
          type: file.type,
        })
        .then(async (res) => {
          if (res) {
            props.setText(res.data.url);
            await fetch(res.data.signedRequest, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleSubmit}
      />
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </Box>
  );
};
export default FileUpload;
