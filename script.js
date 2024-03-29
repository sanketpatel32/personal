/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Little Do YOu Know",
          artist: "Alex & Sierra",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/11.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/11.mp3",
          url: "https://www.youtube.com/watch?v=4bzIpYiPUUo",
          favorited: false
        },
        {
          name: "Señorita",
          artist: "Mendis",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/1.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=Pkh8UtuejGw",
          favorited: false
        },
        {
          name: "See You Again",
          artist: "Wiz & Charli",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/2.jpg",
        source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=RgKAFK5djSk",
          favorited: true
        },
        {
          name: "Tum Hi Ho Bandhu",
          artist: "Neeraj Shreeshar",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/3.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=o1RducJbUdc",
          favorited: false
        },
        {
          name: "Uff Teri Adaa",
          artist: "Shankar Mahadev",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/4.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=qTsAdjULqwg",
          favorited: false
        },
        {
          name: "Love Me like you Do",
          artist: "Ellie Goulding",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=bgjUzhdmmF0",
          favorited: true
        },
        {
          name: "Wildest Dreams",
          artist: "Taylor Swift",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=IdneKLhsWOQ",
          favorited: false
        },
        {
          name: "Kabira",
          artist: "Arjit Singh",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=jHNNMj5bNQw",
          favorited: true
        },
        {
          name: "Sooraj Dooba Hain",
          artist: "Arjit Singh",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/8.mp3",
            url: "https://www.youtube.com/watch?v=nJZcbidTutE",
          favorited: false
        },
        {
          name: "Unstoppable",
          artist: "Dino James",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=iSallxKpm8Y",
          favorited: false
        },
        {
          name: "Night Changes",
          artist: "1D",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/10.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/10.mp3",
          url: "https://www.youtube.com/watch?v=syFZfO_wfMQ",
          favorited: false
        },
        {
          name: "Unstoppable",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/sanketpatel32/personal/master/img/15.jpg",
          source: "https://raw.githubusercontent.com/sanketpatel32/personal/master/mp3/15.mp3",
          url: "https://www.youtube.com/watch?v=h3h035Eyz5A",
          favorited: false
        },

      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
