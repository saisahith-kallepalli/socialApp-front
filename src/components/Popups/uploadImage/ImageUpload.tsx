import { NextPlanOutlined, SkipPreviousOutlined } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./ImageUpload.scss";

const fileTypes = ["JPG", "PNG", "GIF"];
type Props = {};

const ImageUpload = (props: Props) => {
  const [imageUrls, setImageUrls] = useState<Array<any>>([]);
  const [indexImage, setIndexImage] = useState(0);
  const [file, setFile] = useState(null);
  const dragImage = (event: any) => {
    const keysOfImages = Object.keys(event);
    const imageObjects: Array<any> = [];
    if (keysOfImages) {
      keysOfImages.map((each: any | null) => {
        imageObjects.push(event[each]);
        // console.log(URL.createObjectURL(e.target.files[0]));
      });
    }
    setImageUrls((prev) => [...prev, ...imageObjects]);
  };
  const nextImage = () => {
    if (imageUrls.length <= indexImage + 1) {
      setIndexImage(imageUrls.length - 1);
    } else {
      setIndexImage(indexImage + 1);
    }
  };
  const prevImage = () => {
    if (indexImage - 1 <= 0) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage - 1);
    }
  };
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log(e.isPropagationStopped());
    const keysOfImages = Object.keys(e.target.files);
    const imageObjects: Array<any> = [];
    if (keysOfImages) {
      keysOfImages.map((each: any | null) => {
        imageObjects.push(e.target.files[each]);
        // console.log(URL.createObjectURL(e.target.files[0]));
      });
    }
    setImageUrls((prev) => [...prev, ...imageObjects]);
  };
  console.log(imageUrls);
  return (
    <Box
      sx={{
        height: "80vh",
        width: "80vw",
        backgroundColor: "black",
      }}
    >
      {!imageUrls.length && (
        <FileUploader
          handleChange={dragImage}
          onClick={(e: any) => e.stopPropagation()}
          name="file"
          id="dropFiles"
          types={fileTypes}
          multiple
        >
          <Box
            sx={
              imageUrls.length > 0
                ? {
                    height: "30vh",
                    width: "80vw",
                    backgroundColor: "black",
                  }
                : {
                    height: "80vh",
                    width: "80vw",
                    backgroundColor: "black",
                  }
            }
          >
            <label htmlFor="contained-button-file">
              <img
                src="https://res.cloudinary.com/sahith/image/upload/v1653629103/upload_ig05dk.png"
                alt="upload"
                className="imageEdit"
              />
              <input
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={onChangeImage}
                disabled
              />
              <Button variant="contained" component="span">
                Upload
              </Button>

              {/* {imageUrls?.map((each) => (
            <img id="blah" src={URL.createObjectURL(each)} alt="your image" />
          ))} */}
            </label>
          </Box>
        </FileUploader>
      )}
      <Box>
        <label htmlFor="contained-button">
          <input
            id="contained-button"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={onChangeImage}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        {imageUrls.length && (
          <div className="container-pop ">
            {/* <img className="image-posted " src={photo.image[0].url} alt="mine" /> */}
            <div className="commented-post1">
              <img
                className="image-posted "
                src={URL.createObjectURL(imageUrls[indexImage])}
                alt="mine"
              />
              {imageUrls.length > 1 && (
                <SkipPreviousOutlined
                  className="multiple-icon1"
                  onClick={prevImage}
                />
              )}
              {imageUrls.length > 1 && (
                <NextPlanOutlined
                  className="multiple-icon2"
                  onClick={nextImage}
                />
              )}
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
