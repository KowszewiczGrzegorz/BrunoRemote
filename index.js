var blocked = false;
var moving = false;
var movingCommand = "";


function onBodyLoad() {
	//setInterval(function () {updateCam()}, 1000);
	updateCam();
	registerTouchEvents();
}

function registerTouchEvents() {
	document.getElementById("turnLeftPanel").addEventListener("touchstart", clickTouchTurnLeftPanel, false);
	document.getElementById("turnLeftPanel").addEventListener("touchend", clickTouchTurnLeftPanel, false);
	document.getElementById("turnLeftPanel").addEventListener("mousedown", clickTouchTurnLeftPanel, false);
	document.getElementById("turnLeftPanel").addEventListener("mouseup", clickTouchTurnLeftPanel, false);
	document.getElementById("turnLeftPanel").addEventListener("dragstart", clickTouchTurnLeftPanel, false);	

	document.getElementById("turnRightPanel").addEventListener("touchstart", clickTouchTurnRightPanel, false);
	document.getElementById("turnRightPanel").addEventListener("touchend", clickTouchTurnRightPanel, false);
	document.getElementById("turnRightPanel").addEventListener("mousedown", clickTouchTurnRightPanel, false);
	document.getElementById("turnRightPanel").addEventListener("mouseup", clickTouchTurnRightPanel, false);
	document.getElementById("turnRightPanel").addEventListener("dragstart", clickTouchTurnRightPanel, false);

	document.getElementById("moveForwardPanel").addEventListener("touchstart", clickTouchMoveForwardPanel, false);
	document.getElementById("moveForwardPanel").addEventListener("touchend", clickTouchMoveForwardPanel, false);
	document.getElementById("moveForwardPanel").addEventListener("mousedown", clickTouchMoveForwardPanel, false);
	document.getElementById("moveForwardPanel").addEventListener("mouseup", clickTouchMoveForwardPanel, false);
	document.getElementById("moveForwardPanel").addEventListener("dragstart", clickTouchMoveForwardPanel, false);

	document.getElementById("moveBackwardPanel").addEventListener("touchstart", clickTouchMoveBackwardPanel, false);
	document.getElementById("moveBackwardPanel").addEventListener("touchend", clickTouchMoveBackwardPanel, false);
	document.getElementById("moveBackwardPanel").addEventListener("mousedown", clickTouchMoveBackwardPanel, false);
	document.getElementById("moveBackwardPanel").addEventListener("mouseup", clickTouchMoveBackwardPanel, false);
	document.getElementById("moveBackwardPanel").addEventListener("dragstart", clickTouchMoveBackwardPanel, false);
}

function updateCam() {

	var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET',"/php/camPic.php?" + new Date().getTime(),true);

    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e)
    {
        var arr = new Uint8Array(this.response);
        var raw = String.fromCharCode.apply(null,arr);
        var b64=btoa(raw);
        var dataURL="data:image/jpeg;base64,"+b64;
        document.getElementById("camPic").src = dataURL;
        setTimeout(function () { updateCam(); }, 500);
    };

    xmlHTTP.send();
}


function sendSerialCommand(command) {
	xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "php/execSerial.php?cmd=" + command, false );
    xmlHttp.send( null );
}

function startMoving(command) {
	if(!blocked) {
		blocked = true;
		moving = true;	
		move(command.replace(" ", "+"));
	}
}

function move(command) {
	if(moving) {
		sendSerialCommand(command);
		setTimeout(function(){ move(command) }, 1000);
	}
}

function stopMoving() {
	moving = false;
	sendSerialCommand("p stop");
	blocked = false;
}

/* ClickTouchHandlers Controls */

function clickTouchTurnLeftPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnLeftPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("turnLeftPanel").style.background = "";
	}	
}

function clickTouchTurnRightPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnRightPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("turnRightPanel").style.background = "";
	}	
}

function clickTouchMoveForwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("moveForwardPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("p 1");
	}
	else {
		document.getElementById("moveForwardPanel").style.background = "";
		sendSerialCommand("p stop");
		stopMoving();
	}	
}

function clickTouchMoveBackwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("moveBackwardPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("moveBackwardPanel").style.background = "";
	}	
}










