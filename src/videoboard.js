import React from "react";
import VideoPlayer, {Button} from "./videoplayer";
import VideoList from "./videolist";
import VideoInfo from "./videoinfo";


export default class VideoBoard extends React.Component {
  render() {
    return (
      <div className='video-board'>
        <div>
          <VideoPlayer 
            selectedVideoData={this.props.selectedVideoData}
            selectedVideoAsset={this.props.selectedVideoAsset}
            durationFormat={this.props.durationFormat}
            currentTime={this.props.currentTime}
            handleTimeChange={this.props.handleTimeChange} 
            vidRef={this.props.vidRef}
            playOrPauseToggle={this.props.playOrPauseToggle}
            play={this.props.play}
            isVideoEnded={this.props.isVideoEnded}
            volumeValue={this.props.volumeValue}
            handleVolumeChange={this.props.handleVolumeChange}
            handleFullScreen={this.props.handleFullScreen}
            resolutionValue={this.props.resolutionValue}
            handleResolutionChange={this.props.handleResolutionChange}
            handleMuteToggle={this.props.handleMuteToggle}
          />
          <VideoInfo
            selectedVideoData={this.props.selectedVideoData} 
            tags={this.props.tags}
          />
        </div>
        <div>
          <VideoList 
            videoData={this.props.videoData}
            selectedVideoData={this.props.selectedVideoData}
            durationFormat={this.props.durationFormat}
            selectedContentId={this.props.selectedContentId}
            handleVideoChange={this.props.handleVideoChange}
          />
          <div className='container-load-more'>
            <Button
              title='Load More'
              buttonText='Load More'
              className='video-load-more'
              onClick={this.props.handleLoadMore}
            />
          </div>  
        </div>        
      </div>
    )
  }
}