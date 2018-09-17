// lyric info
const songList = {
  1: "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', '),
  2: "Im just a bachelor, Im looking for a partner, Someone who knows how to ride, Without even falling off, Gotta be compatible, takes me to my limits, Girl when I break you off, I promise that you wont want to get off, If youre horny, let's do it, Ride it, my pony, My saddles waiting, Come and jump on it, If youre horny, lets do it, Ride it, my pony, My saddles waiting, come and jump on it, Sitting here flossing, Peeping your steelo, Just once if I have the chance, The things I will do to you, You and your body, Every single portion, Send chills up and down your spine, Juices flowing down your thigh, If youre horny, lets do it, Ride it, my pony, My saddle's waiting, Come and jump on it, If were gonna get nasty, baby, First well show and tell, Till I reach your ponytail, Lurk all over and through you baby, Until we reach the stream, Youll be on my jockey team, If youre horny, lets do it, Ride it, my pony, My saddles waiting, Come and jump on it".split(', ')
};

// initial state
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Bye Bye Bye"
      artist: "N'Sync",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2 : {
      title: "Pony",
      artist: "Genuine",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0
    }
  }
}

// reducer
const lyricsChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state[action.currentSongId], {

      })
  }
}

// jest tests plus setup
const { expect } = window; // only if loading Jest CDN

expect(lyricsChangeReducer(initialState.songsById, { type: null})).toEqual(initialState.songsById);

expect(lyricsChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2})).toEqual({
  1: {
    title: "Bye Bye Bye"
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2 : {
    title: "Pony",
    artist: "Ginuwine",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1
  }
});

expect(lyricsChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1})).toEqual({
  1: {
    title: "Bye Bye Bye",
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});



// redux store
const { createStore } = Redux;
const store = createStore(lyricsChangeReducer);

// rendering state in DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderedLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderedLine);
}

window.onload = function() {
  renderLyrics();
}

// click listener
const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC' });
  }
}


// subscribe to redux store
store.subscribe(renderLyrics);
