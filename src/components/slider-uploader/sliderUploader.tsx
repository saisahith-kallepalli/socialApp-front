import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./siderUploader.scss";
import { Badge, Button, IconButton } from "@mui/material";
import { AddAPhoto, Clear } from "@mui/icons-material";
import { Box, height } from "@mui/system";
type Props = {
  imageArray: any;
  removeImage: any;
  onChangeImage: any;
};
const SliderUploader = (props: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  return (
    <div className="container-slide">
      <Slider {...settings}>
        {props.imageArray.map((each: any, i: any) => (
          <div key={i} className="cont-size">
            <Badge
              overlap="circular"
              badgeContent={<Clear onClick={() => props.removeImage(i)} />}
              color="default"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <img
                src={(window.URL || window.webkitURL).createObjectURL(each)}
                alt="Responsive img"
                className="image-slide"
              />
            </Badge>
          </div>
        ))}
        <label htmlFor="contained-button-add">
          <input
            id="contained-button-add"
            placeholder="ll"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={props.onChangeImage}
          />
          <Button
            component="span"
            sx={{
              width: "10vw",
              height: "18vh",
              display: "flex",
              borderRadius: "0px",
              backgroundColor: "white",
              color: "#1111117e",
            }}
          >
            <AddAPhoto sx={{ height: "9vh", width: "5vw" }} />
          </Button>
        </label>
      </Slider>
    </div>
  );
};
export default SliderUploader;
