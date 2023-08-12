import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function CardCar(props) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              props.MOTORCYCLE_IMAGE == null || props.MOTORCYCLE_IMAGE == ""
                ? "https://scontent.fbkk4-1.fna.fbcdn.net/v/t1.6435-9/88149691_2597427603914262_9219278756928028672_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ad2b24&_nc_eui2=AeGWgupA9yi37KS8nvtRbv3sf-w2S2N731B_7DZLY3vfUMPfB0rjzurpbUDGXvlejjLoHLzN4_BAcmoG5W9uAQjL&_nc_ohc=WgZQkavwRpEAX9zVeYH&_nc_ht=scontent.fbkk4-1.fna&oh=00_AfD-K3byocAah6dp4xxJxvTn46vZhT3Glvy_8IcqjKs6Qw&oe=64F9D2DA"
                : props.MOTORCYCLE_IMAGE
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              ราคา: {props.MOTORCYCLE_PRICE}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ยี้ห้อ: {props.MOTORCYCLE_BRAND}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              รุ่น: {props.MOTORCYCLE_BRAND}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              สี: {props.MOTORCYCLE_COLOR}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ทะเบียน: {props.MOTORCYCLE_REGISTRATION_NUMBER}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              เลขตัวถัง: {props.MOTORCYCLE_BUCKET_NUMBER}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CardCar;
