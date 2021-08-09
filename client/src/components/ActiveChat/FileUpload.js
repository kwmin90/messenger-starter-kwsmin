import { Box, Button, InputLabel, Input } from "@material-ui/core";
import React from "react";
import { uploadFile } from "../../store/utils/thunkCreators";

const FileUpload = (props) => {
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
    <Box>
      <Input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleSubmit}
      />
      <InputLabel htmlFor="raised-button-file">
        <Button variant="outlined" component="span">
          Upload
        </Button>
      </InputLabel>
    </Box>
  );
};
export default FileUpload;
