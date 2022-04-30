import React from "react";

class Tags extends React.Component {
  render () {
    const tags = this.props.tags;
    return (
      <div className='video-info-tags'>
        {tags.filter((data, i) => i < 2).map((item, index) => {
          return (
            <button key={index} className='tag-link'>#{item} </button>
          );
        })}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    const selectedVideoData = this.props.selectedVideoData;
    const publishDate = new Date(selectedVideoData.metadata.publishDate);
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const formatedDate = publishDate.getDate();
    const formatedYear = publishDate.getFullYear();
    const formatedMonth = months[publishDate.getMonth()];
    return (
      <div className='video-info-header'>
        <div>{selectedVideoData.metadata.title}</div>
        <div className='video-info-date'>{`${formatedMonth} ${formatedDate}, ${formatedYear}`}</div>
      </div>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
      <div className='video-info-description'>{this.props.selectedVideoData.metadata.description}</div>
    );
  }
}

export default class VideoInfo extends React.Component {
  render() {  
    return (
      <div className='video-info'>
        <Tags tags={this.props.tags} />
        <Header selectedVideoData={this.props.selectedVideoData} />
        <Description selectedVideoData={this.props.selectedVideoData} />
      </div>
    );
  }
} 