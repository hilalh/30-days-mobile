import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import PlayerUI from '../components/YouTube/PlayerUI';
import VideoListUI from '../components/YouTube/VideoListUI';
import SearchBar from '../components/common/SearchBar';
import Api       from '../apis/youtube/APIv3'
// TODO: ✍🏽 
/* 1. Have a search bar with YouTube featured  videos in squares under
   2.✅ Once video is clicked on, PlayerUI is opened with the WatchTogether at the bottom */
export class YouTubeScreen extends Component {
  static navigationOptions = {
    title: 'YouTube',
  };
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      loading: false,
      videos: dataSource,
      // selectedVideo: ''
    };
  }

  componentDidMount() {
    this._searchData.call(this, 'Nipsey Hussle');
  }

  render() {
    const { videos } = this.state;
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
      {/* // <View style={ {flex: 1} }> */}
      <View style={{ flex: 1 }}>
        <SearchBar 
          style={styles.searchBar}
          // style={{flex: 1}}
          onSubmit={this._searchData.bind(this)}
        />
      </View>
      <View style={{ flex: 5}}>

        {/* <PlayerUI video={this.state.selectedVideo} loading={this.state.loading}/> */}

        <VideoListUI
          style={ styles.videoList }
          // style={ {flex: 5} }
          items={ this.state.videos }
          onVideoSelect={
            selectedVideo => {
              // Don't select re-set state
              // this.setState({selectedVideo});
              // ** Modal ** Navigate instead
              console.log(`Navigating to ${this.state.selectedVideo.snippet.title}`)
              navigate('PlayerUI',{
                video: this.state.selectedVideo,
                loading: this.state.loading
              })
            } 
          }
        />
        {/* TODO: ✍🏽 Add a loader element */}
        {/* <Loader visible={this.state.loading} /> */}
      </View>
    </View>
    )
  }

  _searchData(query) {
    this.setState({loading: true});

    Api.search(query)
    .then(data => {
      this.setState({
        videos: this.state.videos.cloneWithRows(data.items),
        selectedVideo: data.items[0],
        loading: false
      });
    });
  }
}

export default YouTubeNavigator = StackNavigator(
  {
    YouTubeScreen: { screen: YouTubeScreen },
    PlayerUI: { screen: PlayerUI },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoList: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});