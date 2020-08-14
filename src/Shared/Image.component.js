import React from 'react';

export default function ImageComponent(props) {

  return (
    <img onClick={props.onClick} className={props.className} src={`${process.env.PUBLIC_URL}/${props.image.url}.png`} alt={props.image.description} />
  )
}
