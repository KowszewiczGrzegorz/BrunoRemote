var blocked = false;
var moving = false;
var movingCommand = "";
var dist = 30;
var speed = 200;


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
    xmlHttp.open( "GET", "php/execSerial.php?cmd=" + command.replace(/ /g, '+'), false);
    xmlHttp.send( null );
    console.log("Serial cmd: " + command);
}

function startMoving(command) {
	if(!blocked) {
		blocked = true;
		moving = true;	
		move(command);
	}
}

function move(command) {
	if(moving) {
		sendSerialCommand(command);
		setTimeout(function(){ move(command) }, 200);
	}
}

function stopMoving() {
	moving = false;
	sendSerialCommand("SetMotor 0 0 0");
	blocked = false;
}

/* ClickTouchHandlers Controls */

function clickTouchTurnLeftPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnLeftPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor -" + dist + " " + dist + " " + speed);
	}
	else {
		document.getElementById("turnLeftPanel").style.background = "";
		stopMoving();
	}	
}

function clickTouchTurnRightPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnRightPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor " + dist + " -" + dist + " " + speed);
	}
	else {
		document.getElementById("turnRightPanel").style.background = "";
		stopMoving();
	}	
}

function clickTouchMoveForwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("moveForwardPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor " + dist + " " + dist + " " + speed);
	}
	else {
		document.getElementById("moveForwardPanel").style.background = "";
		stopMoving();
	}	
}

function clickTouchMoveBackwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("moveBackwardPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor -" + dist + " -" + dist + " " + speed);
	}
	else {
		document.getElementById("moveBackwardPanel").style.background = "";
		stopMoving();
	}	
}










