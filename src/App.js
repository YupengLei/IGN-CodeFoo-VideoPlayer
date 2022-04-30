import './App.css';
import React from 'react';
import VideoBoard from './videoboard';

export default class App extends React.Component {
  state = {
    videoData: [],
    selectedVideoData: null,
    selectedVideoAsset: null,
    playlistIndex: 0,
    selectedContentId: null,
    currentTime: 0,
    play: false,
    isVideoEnded: false,
    volumeValue: 0.5,
    previousVolumeValue: null,
    resolutionValue: null,
    tags: [],
  }

  vidRef = React.createRef();

  durationFormat = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
  }

  handleTimeChange = (value) => {
    this.vidRef.current.currentTime = value;
    if (value !== 0.0 && value !== this.state.selectedVideoData.metadata.duration) {
      this.vidRef.current.play();
      this.setState({
        play : true,
        isVideoEnded : false
      });
    }
  }

  playOrPauseToggle = () => {
    let play = this.state.play;
    if (!play) {
      this.vidRef.current.play();  
      play = true;     
    } else {
      this.vidRef.current.pause();      
      play = false;
    }
    this.vidRef.current.ontimeupdate = () => {
      this.setState({ currentTime: this.vidRef.current.currentTime });
    };
    this.vidRef.current.onended = () => {
      let playlistIndex = this.state.playlistIndex;
      let selectedVideoData = this.state.selectedVideoData;
      let videoData = this.state.videoData;
      if (playlistIndex + 1 < videoData.length) {
        selectedVideoData = this.state.videoData[playlistIndex + 1];
        this.handleVideoChange(selectedVideoData.contentId, playlistIndex + 1);
      } else {
        this.setState({
          isVideoEnded: true,
          play : false
        });
      }     
    }   
    this.setState({ play: play });
  }

  handleVolumeChange = (value) => {
    this.vidRef.current.volume = value;
    let volumeValue = this.state.volumeValue;
    volumeValue = value;
    this.setState({ volumeValue: volumeValue });
  }

  handleMuteToggle = () => {
    let volumeValue = this.state.volumeValue;
    let previousVolumeValue = this.state.previousVolumeValue;    
    if (volumeValue !== 0) {
      previousVolumeValue = volumeValue;
      this.handleVolumeChange(0);      
    } else {
      if (previousVolumeValue >= 0.2) {
        this.handleVolumeChange(previousVolumeValue);
      } else {
        this.handleVolumeChange(0.5);
      }
    }
    this.setState({ previousVolumeValue: previousVolumeValue });
  }
  
  handleFullScreen = () => {
    const el = this.vidRef.current;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  handleResolutionChange = (value) => {
    let videoList = this.state.selectedVideoData.assets;
    let heightGroup = videoList.map(item => item.height);
    let uniqueVideoList = videoList.filter(({height}, index) => !heightGroup.includes(height, index + 1));
    let resolutionValue = this.state.resolutionValue;
    let selectedVideoAsset = this.state.selectedVideoAsset;
    resolutionValue = value;
    selectedVideoAsset = uniqueVideoList.find(item => `${item.height}P` === value);    
    this.setState({
      resolutionValue: resolutionValue,
      selectedVideoAsset: selectedVideoAsset
    }, () => {
      this.vidRef.current.currentTime = this.state.currentTime;
      this.state.play ? this.vidRef.current.play() : this.vidRef.current.pause();
    });
  }

  handleVideoChange = (id, index) => {
    let selectedVideoData = this.state.selectedVideoData;
    let selectedContentId = this.state.selectedContentId;
    let selectedVideoAsset = this.state.selectedVideoAsset;
    let resolutionValue = this.state.resolutionValue;
    let playlistIndex = this.state.playlistIndex;
    let tags = this.state.tags;
    selectedContentId = id;
    selectedVideoData = this.state.videoData.find(item => item.contentId === id);
    selectedVideoAsset = selectedVideoData.assets[0];
    resolutionValue = `${selectedVideoAsset.height}P`;
    playlistIndex = index;
    tags = selectedVideoData.tags;
    tags = tags.sort((a, b) => 0.5 - Math.random());
    this.setState({
      selectedVideoData: selectedVideoData,
      selectedContentId: selectedContentId,
      selectedVideoAsset: selectedVideoAsset,
      currentTime: 0,
      play: false,
      isVideoEnded: false,
      resolutionValue: resolutionValue,
      playlistIndex: playlistIndex,
      tags: tags
    }, () => this.playOrPauseToggle());
  }

  handleLoadMore = () => {
    let randomIndex = Math.floor(Math.random() * 301);
    let replaceString = `startIndex=${randomIndex}`;
    const proxy = 'https://thingproxy.freeboard.io/fetch/';
    fetch(proxy + 'https://ign-apis.herokuapp.com/')
    .then(response => response.json())
    .then(json => {
      const videoJsonUrl = json.endpoints[1].sampleRequest.replace('startIndex=30', replaceString);
      fetch(proxy + videoJsonUrl)
      .then(response => response.json())
      .then(json => 
        this.setState({
          videoData: json.data,        
          playlistIndex: -1
        })
      ).catch(e  => {
        console.error(e);
      }) 
    })
    .catch(e => {
      console.error(e);
    });                            
  }

  componentDidMount = () => {
    let randomIndex = Math.floor(Math.random() * 301);
    let replaceString = `startIndex=${randomIndex}`;
    const proxy = 'https://thingproxy.freeboard.io/fetch/';
    fetch(proxy + 'https://ign-apis.herokuapp.com/')
    .then(response => response.json())
    .then(json => {
      const videoJsonUrl = json.endpoints[1].sampleRequest.replace('startIndex=30', replaceString);
      fetch(proxy + videoJsonUrl)
      .then(response => response.json())
      .then(json => 
        this.setState({
          videoData: json.data,
          selectedVideoData: json.data[0],
          resolutionValue: json.data[0].assets[0].height,
          selectedVideoAsset: json.data[0].assets[0],
          selectedContentId: json.data[0].contentId,
          tags: json.data[0].tags
        })
      ).catch(e  => {
        console.error(e);
      }) 
    })
    .catch(e => {
      console.error(e);
    });                                          
  }

  render() {
    return (
      <div>
        {this.state.videoData && this.state.selectedVideoData && this.state.selectedVideoAsset && this.state.selectedContentId ?
          <VideoBoard 
            videoData={this.state.videoData}
            selectedVideoAsset={this.state.selectedVideoAsset}
            selectedVideoData={this.state.selectedVideoData}
            selectedContentId={this.state.selectedContentId}
            durationFormat={this.durationFormat}
            currentTime={this.state.currentTime}
            handleTimeChange={this.handleTimeChange} 
            vidRef={this.vidRef}
            playOrPauseToggle={this.playOrPauseToggle}
            play={this.state.play}
            isVideoEnded={this.state.isVideoEnded}
            volumeValue={this.state.volumeValue}
            handleVolumeChange={this.handleVolumeChange}
            handleFullScreen={this.handleFullScreen}
            resolutionValue={this.state.resolutionValue}
            handleResolutionChange={this.handleResolutionChange}
            handleVideoChange={this.handleVideoChange}
            handleLoadMore={this.handleLoadMore}
            playlistIndex={this.state.playlistIndex}
            tags={this.state.tags}
            handleMuteToggle={this.handleMuteToggle}
          />          
        : <React.Fragment>Loading...</React.Fragment>
        }        
      </div>
    )
  }
}
