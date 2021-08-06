import { Box, Button, InputLabel, Input } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { uploadFile } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  label: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  button: {
    float: "right",
    width: 10,
  },
}));
const FileUpload = (props) => {
  const classes = useStyles();

  const handleSubmit = async ({ target }) => {
    const file = target.files[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) {
        props.setText(url);
      }
    }
  };
  return (
    <Box className={classes.root}>
      <Input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleSubmit}
      />
      <InputLabel htmlFor="raised-button-file" className={classes.label}>
        <Button variant="outlined" component="span" className={classes.button}>
          Upload
        </Button>
      </InputLabel>
    </Box>
  );
};
export default FileUpload;
