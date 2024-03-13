import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { strBreak, drawRect } from '../../utils/constants.js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.textcanvasRef = React.createRef();
    this.ctacanvasRef = React.createRef();
    this.defaultBgColor = '#0369A1';
    this.adText = '1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs';
    this.adCTA = 'Shop Now';
    this.adImage = 'https://img.freepik.com/premium-photo/dropping-coffee-beans-coffee-cup_28943-642.jpg';
  }
  
  componentDidMount() {
    this.drawTemplate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adInfo.adText != this.props.adInfo.adText) {
      this.writeTextContent(this.props.adInfo.adText);
    }

    if (prevProps.adInfo.adImage != this.props.adInfo.adImage) {
      this.drawAdImage(this.props.adInfo.adImage);
    }

    if (prevProps.adInfo.adCTA != this.props.adInfo.adCTA) {
      this.writeCTA(this.props.adInfo.adCTA);
    }
  }

  drawTemplate() {
    const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image=new Image()
      const image2=new Image()
        const image3=new Image()
       image.onload=()=>{
       ctx.drawImage(image, 0, 0);
       }
      
        image2.onload=()=>{
        ctx.drawImage(image2, 0, 0);
       }   
       
       image3.onload=()=>{
        ctx.drawImage(image3, 0, 0);
       }
    image.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png';
    image2.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png';
    image3.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345';
  }

  drawAdImage(img) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    ctx.clearRect(56, 442, 970, 600);
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 56, 442, 970, 600);
    };
    image.src = img || this.adImage;
    ctx.globalCompositeOperation = 'source-over';
  }

  writeTextContent = (text) => {
    const canvas = this.textcanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '44px Arial';
    let start = 90;
    if (!text) {
      text = this.adText;
    }
    const lines = strBreak(text, 31);
    lines.map(line => {
      ctx.fillText(line, 50, start);
      start += 50;
    });
  }

  writeCTA = (text) => {
    // console.log('writeCTA', text);
    const canvas = this.ctacanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bgColor = '#000000';
    if (text === '') {
      text = this.adCTA;
    }
    const lines = strBreak(text, 20);
    ctx.font = '30px Arial';
    const text_width = ctx.measureText(lines[0]).width;
    const text_height = lines.length * 30;
    const width = text_width + 48;
    const height = text_height + 48;
    drawRect(190, 320, width, height, 20, bgColor, ctx);
    let starty = 320 + (height / 2 + 8);
    const startx = 190 + 24;
    ctx.fillStyle = '#ffffff';
    lines.map(line => {
      ctx.fillText(line, startx, starty);
      starty += 30;
    });
  }

  render() {
    return (
      <>
      
        <canvas
          className='w-56 sm:w-[30rem]'
          ref={this.canvasRef}
          width={1080}
          height={1080}
          style={{ backgroundColor: `${this.props.adInfo.adBgColor}`, position: 'absolute' }}
        ></canvas>
        <canvas
          className='w-56 sm:w-[30rem]'
          ref={this.textcanvasRef}
          width={1080}
          height={1080}
          style={{ position: 'absolute' }}
        ></canvas>
        <canvas
          className='w-56 sm:w-[30rem]'
          ref={this.ctacanvasRef}
          width={1080}
          height={1080}
          style={{ position: 'absolute' }}
        ></canvas>
      </>
    );
  }
}

Canvas.propTypes = {
  adInfo: PropTypes.shape({
    adText: PropTypes.string,
    adImage: PropTypes.string,
    adCTA: PropTypes.string,
    adBgColor: PropTypes.string
  })
};

export default Canvas;
