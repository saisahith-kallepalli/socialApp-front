import {
  ArrowBackIos,
  ArrowForwardIos,
  Clear,
  EmojiEmotions,
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./ImageUpload.scss";
import { postService } from "../../../utils/posts.service";
import Cookies from "js-cookie";

const fileTypes = ["JPG", "PNG", "GIF"];
type Props = {};

const ImageUpload = (props: Props) => {
  const authToken = Cookies.get("_token");
  const token = "Bearer " + authToken;
  const [imageUrls, setImageUrls] = useState<Array<any>>([]);
  const [indexImage, setIndexImage] = useState<Number>(0);
  const [caption, setCaption] = useState<string>("");
  const [showEmojis, setShowEmojis] = useState<Boolean>(false);
  const [file, setFile] = useState(null);

  const onClickPost = async () => {
    const data = new FormData();
    imageUrls.map((each: any) => data.append("image", each));
    data.append("caption", caption);
    postService.newPost(token, data);
  };
  const emojisShow = () => {
    setShowEmojis((prev) => !prev);
  };
  const onChangeCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };
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

  const removeImage = () => {
    const filteredImages = imageUrls.filter((e, i) => i !== indexImage);
    console.log(filteredImages);
    setImageUrls(filteredImages);
    setIndexImage(0);
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
        width: "50vw",
        height: "70vh",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
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
                    display: "none",
                  }
                : {
                    height: "50vh",
                    width: "50vw",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px",
                  }
            }
          >
            <label htmlFor="contained-button-file" className="imageEdit1">
              <img
                src="https://res.cloudinary.com/sahith/image/upload/v1653886450/upload_1_c5pwae.png"
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
      {imageUrls.length ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pt: "5px",
              pr: "5px",
              pl: "5px",
            }}
          >
            <label htmlFor="contained-button">
              <input
                id="contained-button"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={onChangeImage}
              />
              <Button variant="contained" component="span">
                Upload More
              </Button>
            </label>

            <Button variant="contained" onClick={onClickPost}>
              Post
            </Button>
          </Box>
          <hr />

          <TextField
            id="outlined-multiline-static"
            label="Caption"
            placeholder="Write Caption.........."
            multiline
            sx={{ pb: "5px", pl: "5px", pr: "5px" }}
            rows={2}
            value={caption}
            onChange={onChangeCaption}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" onClick={emojisShow}>
                  <IconButton>
                    <EmojiEmotions />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <>
            <div className="container-pop">
              {/* <img className="image-posted " src={photo.image[0].url} alt="mine" /> */}
              <div className="imageEditUploaded">
                <img
                  className="imageEditUploaded"
                  src={(window.URL || window.webkitURL).createObjectURL(
                    imageUrls[indexImage]
                  )}
                  alt="mine"
                />
                {imageUrls.length > 1 && (
                  <Clear className="multiple-icon-back" onClick={removeImage} />
                )}
                {imageUrls.length > 1 && indexImage >= 1 ? (
                  <IconButton className="multiple-icon1" onClick={prevImage}>
                    <ArrowBackIos />
                  </IconButton>
                ) : (
                  ""
                )}
                {imageUrls.length > 1 && indexImage < imageUrls.length - 1 ? (
                  <IconButton className="multiple-icon2" onClick={nextImage}>
                    <ArrowForwardIos />
                  </IconButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
          {showEmojis ? (
            <Picker
              onEmojiClick={(e: any, emoji: any) =>
                setCaption((prev) => prev + emoji.emoji)
              }
            />
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ImageUpload;
