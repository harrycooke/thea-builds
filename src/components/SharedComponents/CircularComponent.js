import React from 'react';
import Typography from "@material-ui/core/Typography";

export const CircularComponent = props => {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.backgroundColor,
        borderRadius: "50%",
        display: "inline-block"
      }}
      className="text-center"
    >
      <Typography
        style={{
          lineHeight: props.lineHeight,
          fontSize: props.fontSize,
          fontWeight: "bold",
          color: "#ffffff",
          fontFamily: "Open Sans - Extra Bold"
        }}>
        {props.text}
      </Typography>
    </div>
  )
}

export default CircularComponent