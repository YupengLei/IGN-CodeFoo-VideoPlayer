import React from 'react';

class VideoScreen extends React.Component {
  render() {  
    return (
      <div>
        <video 
          ref={this.props.vidRef} 
          src={this.props.selectedVideoAsset.url} 
          className='video' 
          poster={this.props.selectedVideoData.thumbnails[2].url}
          onClick={() => this.props.playOrPauseToggle()}
        /> 
        <div className='top-left'>{this.props.selectedVideoData.metadata.title}</div>     
      </div>      
    );
  }
}

export class Button extends React.Component {
  render() {
    return (
      <button className={this.props.className} title={this.props.title} onClick={this.props.onClick}>{this.props.buttonText}</button>
    );
  }
}

class RangeSlider extends React.Component {
  render() {
    return (
      <input type='range' className={this.props.className} min={this.props.min} value={this.props.value} onChange={this.props.onChange} step='any' max={this.props.max} style={{backgroundSize: this.props.percentage}} />
    );
  }
}

class VideoProgress extends React.Component {
  render() {
    const formatedDuration = this.props.durationFormat(this.props.selectedVideoData.metadata.duration);
    const formatedCurrentTime = this.props.durationFormat(this.props.currentTime);
    const progressPercentage = this.props.currentTime / this.props.selectedVideoData.metadata.duration * 100;
    return (
      <div className='progress-video-container'>
        <span className='progress-time time-video'>{formatedCurrentTime}</span>
        <RangeSlider
          currentTime={this.props.currentTime}
          handleTimeChange={this.props.handleTimeChange} 
          selectedVideoData={this.props.selectedVideoData}
          className='control-item progress-video'
          min='0.0'
          value={this.props.currentTime} 
          onChange={(e) => this.props.handleTimeChange(e.target.value)} 
          max={this.props.selectedVideoData.metadata.duration}
          percentage={`${progressPercentage}%`}
        />
        <span className='duration-time time-video'>{formatedDuration}</span>
      </div>
    );
  }
}

class VolumeControl extends React.Component {
  render() {
    return (
      <div className='audio-video-container'>
        <Button
           className={this.props.volumeValue < 0.2 ? 'control-item volume-video fa fa-volume-off' : 'control-item volume-video fa fa-volume-up'}
           title='Volume'
           onClick={this.props.handleMuteToggle}
        />
        <RangeSlider 
          className='control-item slide-volume-video' 
          min='0' 
          value={this.props.volumeValue} 
          onChange={(e) => this.props.handleVolumeChange(e.target.value)}
          step='any' 
          max='1'
          percentage={`${this.props.volumeValue * 100}%`}
        />
      </div>
    );
  }
}

class VideoResolution extends React.Component {
  render() {
    const videoList = this.props.selectedVideoData.assets;
    const heightGroup = videoList.map(item => item.height);
    const uniqueVideoList = videoList.filter(({height}, index) => !heightGroup.includes(height, index + 1));
    return (
      <select value={this.props.resolutionValue} onChange={(e) => this.props.handleResolutionChange(e.target.value)} >
        {uniqueVideoList.map((item, index) => {
          return (
            <option key={index}>{item.height}P</option>
          );
        })}
      </select>
    );
  }
}

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className='button-group'>
        <div className='left-button-group'>
          <Button
            className={(!this.props.play || this.props.isVideoEnded) ? 'control-item play-and-pause-video fa fa-play' : 'control-item play-and-pause-video fa fa-pause'}
            title={this.props.play ? 'Pause' : 'Play'}
            onClick={this.props.playOrPauseToggle}
          />
        </div>        
        <div className='right-button-group' >         
          <VideoResolution 
            resolutionValue={this.props.resolutionValue}
            handleResolutionChange={this.props.handleResolutionChange}
            selectedVideoData={this.props.selectedVideoData}
          />          
          <VolumeControl 
            volumeValue={this.props.volumeValue}
            handleVolumeChange={this.props.handleVolumeChange}
            handleMuteToggle={this.props.handleMuteToggle}
          />
          <Button 
            className='control-item fullscreen-video fa fa-expand'
            onClick={this.props.handleFullScreen}
          />
        </div>        
      </div>
    );
  }
}

class VideoControl extends React.Component {
  render() {
    return (
      <div className='video-controls video-controls-visibility--visible'>
        <VideoProgress
          selectedVideoData={this.props.selectedVideoData}
          durationFormat={this.props.durationFormat}
          currentTime={this.props.currentTime}
          handleTimeChange={this.props.handleTimeChange}
          vidRef={this.props.vidRef}
        />
        <ButtonGroup
          play={this.props.play} 
          isVideoEnded={this.props.isVideoEnded}
          playOrPauseToggle={this.props.playOrPauseToggle}
          volumeValue={this.props.volumeValue}
          handleVolumeChange={this.props.handleVolumeChange}
          handleFullScreen={this.props.handleFullScreen}
          resolutionValue={this.props.resolutionValue}
          handleResolutionChange={this.props.handleResolutionChange}
          selectedVideoData={this.props.selectedVideoData}
          handleMuteToggle={this.props.handleMuteToggle}
        />
      </div>
    );
  }
}

export default class VideoPlayer extends React.Component {
  render() {
    return (
        <div className='video-container'>
          <VideoScreen 
            selectedVideoData={this.props.selectedVideoData} 
            vidRef={this.props.vidRef}
            selectedVideoAsset={this.props.selectedVideoAsset}
            playOrPauseToggle={this.props.playOrPauseToggle} 
          />
          <VideoControl 
            selectedVideoData={this.props.selectedVideoData}
            durationFormat={this.props.durationFormat}
            currentTime={this.props.currentTime}
            handleTimeChange={this.props.handleTimeChange}
            playOrPauseToggle={this.props.playOrPauseToggle} 
            play={this.props.play}
            vidRef={this.props.vidRef}
            isVideoEnded={this.props.isVideoEnded}
            volumeValue={this.props.volumeValue}
            handleVolumeChange={this.props.handleVolumeChange}
            handleFullScreen={this.props.handleFullScreen}
            resolutionValue={this.props.resolutionValue}
            handleResolutionChange={this.props.handleResolutionChange}
            handleMuteToggle={this.props.handleMuteToggle}
          />          
        </div>
    )
  }
}
