import React from "react";

class Thumbnails extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className='thumb'>
        <img src={item.thumbnails[0].url} alt={item.metadata.title} />
        <div className='bottom-right'>{this.props.formatedDuration}</div>
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div className='v-titles'>
        <div className='title'>{this.props.item.metadata.title}</div> 
      </div>
    );
  }
}

class VideoItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className='video-li'>
        <div className='video-con active-con' style={this.props.style} onClick={this.props.onClick} >
          <Thumbnails
              item={item}
              formatedDuration={this.props.formatedDuration}
          />
          <Title item={item} />
        </div>
      </div>
    );
  }
}

export default class VideoList extends React.Component {
  render() {
    return (
      <div >
        {this.props.videoData.map((item, index) => {
          const formatedDuration = this.props.durationFormat(item.metadata.duration);
          const selectedStyle = {
            backgroundColor :this.props.selectedContentId === item.contentId ?  'rgba(19, 35, 47, 0.3)' : null
          };
          return (
            <VideoItem 
              key={index}
              style={selectedStyle}
              onClick={() => this.props.handleVideoChange(item.contentId, index)}
              item={item}
              formatedDuration={formatedDuration}
            />
          );
        })}
      </div>    
    );
  }
}


