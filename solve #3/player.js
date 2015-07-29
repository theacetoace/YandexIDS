function Player ( el ) {
  this.ac = new ( window.AudioContext || webkitAudioContext )();
  this.el = el;
  this.button = el.find('#play');
  this.track = el.find('.track');
  this.progress = el.find('.progress');
  this.scrubber = el.find('.scrubber');
  this.message = el.find('.message');
  this.artist = el.find('.artist');
  this.addFile = el.find('#audio_file');
  this.drag = el.find('.dragndrop');
  this.message.html('Loading');
  this.canvas = el.find('#myCanvas');
  this.ctx = el.find('#myCanvas')[0].getContext("2d");
  this.pop = el.find('#pop');
  this.rock = el.find('#rock');
  this.jazz = el.find('#jazz');
  this.classic = el.find('#classic');
  this.normal = el.find('#normal');
  this.init();
  this.bindEvents();
}

Player.prototype.init = function() {
  this.analyser = this.ac.createAnalyser();
  this.analyser.smoothingTimeConstant = 0.3;
  this.analyser.fftSize = 1024;
  this.javascriptNode = this.ac.createScriptProcessor(2048, 1, 1);
  this.javascriptNode.connect(this.ac.destination);
  this.analyser.connect(this.javascriptNode);
  this.equalizerNodes = [
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
    this.ac.createBiquadFilter(),
  ];
  for (var i = 0; i < (this.equalizerNodes.length); i++) {
  	this.equalizerNodes[i].type = "peaking";
  }
  for (var i = 0; i < (this.equalizerNodes.length)-1; i++) {
  	this.equalizerNodes[i].connect(this.equalizerNodes[i + 1]);
  }
  this.equalizerNodes[9].connect(this.ac.destination);

  this.equalizerNodes[0].frequency.value = 60;
  this.equalizerNodes[1].frequency.value = 170;
  this.equalizerNodes[2].frequency.value = 310;
  this.equalizerNodes[3].frequency.value = 600;
  this.equalizerNodes[4].frequency.value = 1000;
  this.equalizerNodes[5].frequency.value = 3000;
  this.equalizerNodes[6].frequency.value = 6000;
  this.equalizerNodes[7].frequency.value = 12000;
  this.equalizerNodes[8].frequency.value = 14000;
  this.equalizerNodes[9].frequency.value = 16000;
};

Player.prototype.popClick = function() {
  this.pop.addClass('eqactive');
  this.rock.removeClass('eqactive');
  this.jazz.removeClass('eqactive');
  this.classic.removeClass('eqactive');
  this.normal.removeClass('eqactive');
  this.equalizerNodes[0].gain.value = -10;
  this.equalizerNodes[1].gain.value = 25;
  this.equalizerNodes[2].gain.value = 35;
  this.equalizerNodes[3].gain.value = 40;
  this.equalizerNodes[4].gain.value = 25;
  this.equalizerNodes[5].gain.value = -5;
  this.equalizerNodes[6].gain.value = -15;
  this.equalizerNodes[7].gain.value = -15;
  this.equalizerNodes[8].gain.value = -10;
  this.equalizerNodes[9].gain.value = -10;
  for (var i = 0; i < (this.equalizerNodes.length); i++) {
  	this.equalizerNodes[i].gain.value = this.equalizerNodes[i].gain.value / 10;
  }
}

Player.prototype.rockClick = function() {
  this.rock.addClass('eqactive');
  this.pop.removeClass('eqactive');
  this.jazz.removeClass('eqactive');
  this.classic.removeClass('eqactive');
  this.normal.removeClass('eqactive');
  this.equalizerNodes[0].gain.value = 40;
  this.equalizerNodes[1].gain.value = 25;
  this.equalizerNodes[2].gain.value = -30;
  this.equalizerNodes[3].gain.value = -40;
  this.equalizerNodes[4].gain.value = -20;
  this.equalizerNodes[5].gain.value = 20;
  this.equalizerNodes[6].gain.value = 45;
  this.equalizerNodes[7].gain.value = 55;
  this.equalizerNodes[8].gain.value = 55;
  this.equalizerNodes[9].gain.value = 55;
  for (var i = 0; i < (this.equalizerNodes.length); i++) {
  	this.equalizerNodes[i].gain.value = this.equalizerNodes[i].gain.value / 10;
  }
}

Player.prototype.jazzClick = function() {
  this.jazz.addClass('eqactive');
  this.rock.removeClass('eqactive');
  this.pop.removeClass('eqactive');
  this.classic.removeClass('eqactive');
  this.normal.removeClass('eqactive');
  this.equalizerNodes[0].gain.value = 0;
  this.equalizerNodes[1].gain.value = 0;
  this.equalizerNodes[2].gain.value = -5;
  this.equalizerNodes[3].gain.value = -30;
  this.equalizerNodes[4].gain.value = 0;
  this.equalizerNodes[5].gain.value = -35;
  this.equalizerNodes[6].gain.value = -35;
  this.equalizerNodes[7].gain.value = 0;
  this.equalizerNodes[8].gain.value = 0;
  this.equalizerNodes[9].gain.value = 0;
  for (var i = 0; i < (this.equalizerNodes.length); i++) {
  	this.equalizerNodes[i].gain.value = this.equalizerNodes[i].gain.value / 10;
  }
}

Player.prototype.classicClick = function() {
  this.classic.addClass('eqactive');
  this.rock.removeClass('eqactive');
  this.jazz.removeClass('eqactive');
  this.pop.removeClass('eqactive');
  this.normal.removeClass('eqactive');
  this.equalizerNodes[0].gain.value = 0;
  this.equalizerNodes[1].gain.value = 0;
  this.equalizerNodes[2].gain.value = 0;
  this.equalizerNodes[3].gain.value = 0;
  this.equalizerNodes[4].gain.value = 0;
  this.equalizerNodes[5].gain.value = 0;
  this.equalizerNodes[6].gain.value = -40;
  this.equalizerNodes[7].gain.value = -40;
  this.equalizerNodes[8].gain.value = -40;
  this.equalizerNodes[9].gain.value = -50;
  for (var i = 0; i < (this.equalizerNodes.length); i++) {
  	this.equalizerNodes[i].gain.value = this.equalizerNodes[i].gain.value / 10;
  }
}

Player.prototype.normalClick = function() {
  this.normal.addClass('eqactive');
  this.rock.removeClass('eqactive');
  this.jazz.removeClass('eqactive');
  this.pop.removeClass('eqactive');
  this.classic.removeClass('eqactive');
  this.equalizerNodes[0].gain.value = 0;
  this.equalizerNodes[1].gain.value = 0;
  this.equalizerNodes[2].gain.value = 0;
  this.equalizerNodes[3].gain.value = 0;
  this.equalizerNodes[4].gain.value = 0;
  this.equalizerNodes[5].gain.value = 0;
  this.equalizerNodes[6].gain.value = 0;
  this.equalizerNodes[7].gain.value = 0;
  this.equalizerNodes[8].gain.value = 0;
  this.equalizerNodes[9].gain.value = 0;
}

Player.prototype.bindEvents = function() {
  this.button.click(this.toggle.bind(this));
  this.scrubber.mousedown(this.onMouseDown.bind(this));
  $(window).mousemove(this.onDrag.bind(this));
  $(window).mouseup(this.onMouseUp.bind(this));
  this.addFile.change(this.addPress.bind(this));
  this.drag.on('drop', this.dragProcess.bind(this));
  this.javascriptNode.onaudioprocess = this.onAudioNode.bind(this);
  this.pop.click(this.popClick.bind(this));
  this.rock.click(this.rockClick.bind(this));
  this.jazz.click(this.jazzClick.bind(this));
  this.classic.click(this.classicClick.bind(this));
  this.normal.click(this.normalClick.bind(this));
};

function getAverageVolume(array) {
  var values = 0;
  var average;

  var length = array.length;

  // get all the frequency amplitudes
  for (var i = 0; i < length; i++) {
    values += array[i];
  }

  average = values / length;
  return average;
}

Player.prototype.onAudioNode = function() {
  // get the average, bincount is fftsize / 2
  var array =  new Uint8Array(this.analyser.frequencyBinCount);
  this.analyser.getByteFrequencyData(array);
  var average = getAverageVolume(array)

  // clear the current state
  var ctx_width = this.canvas.width();
  var ctx_height = this.canvas.height();
  this.ctx.clearRect(0, 0, ctx_width, ctx_height);

  var grd_height = Math.ceil(ctx_height / 150 * 50);

  // Create gradient
  var gradient = this.ctx.createLinearGradient(0,0,0,grd_height);
  gradient.addColorStop(1,'#000000');
  gradient.addColorStop(0.75,'#ff0000');
  gradient.addColorStop(0.25,'#ffff00');
  gradient.addColorStop(0,'#ffffff');
  // set the fill style
  this.ctx.fillStyle = gradient;

  this.drawSpectrum(array);
};

Player.prototype.drawSpectrum = function(array) {
  var ctx_width = Math.floor(this.canvas.width());
  var ctx_height = Math.floor(this.canvas.height());
  var step = Math.ceil(ctx_width / (array.length));

  //console.log(ctx_width, ctx_height, step);
  
  for ( var i = 0; i < (array.length); i++ ) {
      var value = array[i] * ctx_height / 175;
      //this.ctx.fillRect(i*5,ctx_height-value,3,ctx_height);
      this.ctx.fillRect(i*3,ctx_height-value,1,ctx_height);
    }
};

Player.prototype.dragProcess = function(e) {
  this.drag.css('border', '2px dotted #0B85A1');
  e.preventDefault();
  var files = e.originalEvent.dataTransfer.files;
  this.playFile = files[0].name;
  this.path = files[0];
  this.url = URL.createObjectURL(files[0]);
  this.fetch();
};

Player.prototype.addPress = function() {
  var files = this.addFile[0].files;
  this.playFile = files[0].name;
  this.path = files[0];
  this.url = URL.createObjectURL(files[0]);
  this.fetch();
}

Player.prototype.fetch = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    this.decode(xhr.response);
  }.bind(this);
  xhr.send();
};

Player.prototype.decode = function( arrayBuffer ) {
  var use_name = this.playFile;
  var use_artist = ''
  url = this.path.urn || this.path.name;
  ID3.loadTags(url, function() {
  	var tags = ID3.getAllTags(url);
  	if (tags !== null) {
  		if (tags.title !== null)
  			use_name = tags.title;
  		if (tags.artist !== null)
  			use_artist += tags.artist;
  	}
  	this.title = tags.title;
  },{
  	tags: ["title","artist","album","picture"],
  	dataReader: FileAPIReader(this.path)
  });
  this.ac.decodeAudioData(arrayBuffer, function( audioBuffer ) {
    this.message.html(use_name);
    this.artist.html(use_artist);
    this.buffer = audioBuffer;
    this.draw();
    this.play();
  }.bind(this));

};

Player.prototype.connect = function() {
  if ( this.playing ) {
    this.pause();
  }
  this.source = this.ac.createBufferSource();
  this.source.buffer = this.buffer;
  /*this.source.connect(this.ac.destination);*/
  this.source.connect(this.equalizerNodes[0]);
  this.source.connect(this.analyser);
};

Player.prototype.play = function( position ) {
  this.connect();
  this.position = typeof position === 'number' ? position : this.position || 0;
  this.startTime = this.ac.currentTime - ( this.position || 0 );
  this.source.start(this.ac.currentTime, this.position);
  this.playing = true;
};

Player.prototype.pause = function() {
  if ( this.source ) {
    this.source.stop(0);
    this.source = null;
    this.position = this.ac.currentTime - this.startTime;
    this.playing = false;
  }
};

Player.prototype.seek = function( time ) {
  if ( this.playing ) {
    this.play(time);
  }
  else {
    this.position = time;
  }
};

Player.prototype.updatePosition = function() {
  this.position = this.playing ? 
    this.ac.currentTime - this.startTime : this.position;
  if ( this.position >= this.buffer.duration ) {
    this.position = this.buffer.duration;
    this.pause();
  }
  return this.position;
};

Player.prototype.toggle = function() {
  if ( !this.playing ) {
    this.play();
  }
  else {
    this.pause();
  }
};

Player.prototype.onMouseDown = function( e ) {
  this.dragging = true;
  this.startX = e.pageX;
  this.startLeft = parseInt(this.scrubber.css("left") || 0, 10);
};

Player.prototype.onDrag = function( e ) {
  var width, position;
  if ( !this.dragging ) {
    return;
  }
  width = this.track.outerWidth();
  position = this.startLeft + ( e.pageX - this.startX );
  position = Math.max(Math.min(width, position), 0);
  this.scrubber.css("left", position);
};

Player.prototype.onMouseUp = function() {
  var width, left, time;
  if ( this.dragging ) {
    width = this.track.outerWidth();
    left = parseInt(this.scrubber.css("left") || 0, 10);
    time = left / width * this.buffer.duration;
    this.seek(time);
    this.dragging = false;
  }
};

Player.prototype.draw = function() {
  var progress = ( this.updatePosition() / this.buffer.duration ),
    width = this.track.outerWidth();
  if ( this.playing ) {
    this.button.find('span').addClass('glyphicon-pause');
    this.button.find('span').removeClass('glyphicon-play');
  } else {
    this.button.find('span').addClass('glyphicon-play');
    this.button.find('span').removeClass('glyphicon-pause');
  }
  this.progress.css("width", progress * width );
  if ( !this.dragging ) {
    this.scrubber.css("left", progress * width );
  }
  window.requestAnimationFrame(this.draw.bind(this));
};

var main = function() {
	// create a new instance of the player and get things started
	window.player = new Player($('.player'));
	$('#back_audio_file').click( function() {
		$('#audio_file').click();
	});
	$('.dragndrop').on('dragenter', function (e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});
	$('.dragndrop').on('dragover', function (e) {
	     e.stopPropagation();
	     e.preventDefault();
	});
	$(document).on('dragenter', function (e) {
	    e.stopPropagation();
	    e.preventDefault();
	});
	$(document).on('dragover', function (e) {
	  e.stopPropagation();
	  e.preventDefault();
	  $('.dragndrop').css('border', '2px dotted #0B85A1');
	});
	$(document).on('drop', function (e) {
	    e.stopPropagation();
	    e.preventDefault();
	});
};

$(document).ready(main);