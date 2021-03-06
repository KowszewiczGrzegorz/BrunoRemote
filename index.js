﻿var blocked = false;
var moving = false;
var movingCommand = "";

var distFast = 100
var speedFast = 190;
var turnDistFast = 30;
var turnSpeedFast = 50;
var distSlow = 5;
var speedSlow = 10;
var turnDistSlow = 10;
var turnSpeedSlow = 10;

var dist = distFast;
var speed = speedFast;
var turnDist = turnDistFast;
var turnSpeed = turnSpeedFast;


function onBodyLoad() {
	updateCam();
	registerTouchEvents();
}

function registerTouchEvents() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		document.getElementById("turnLeftPanel").addEventListener("touchstart", clickTouchTurnLeftPanel, false);
		document.getElementById("turnLeftPanel").addEventListener("touchend", clickTouchTurnLeftPanel, false);
		
		document.getElementById("turnRightPanel").addEventListener("touchstart", clickTouchTurnRightPanel, false);
		document.getElementById("turnRightPanel").addEventListener("touchend", clickTouchTurnRightPanel, false);
		
		document.getElementById("moveForwardPanel").addEventListener("touchstart", clickTouchMoveForwardPanel, false);
		document.getElementById("moveForwardPanel").addEventListener("touchend", clickTouchMoveForwardPanel, false);
		
		document.getElementById("moveBackwardPanel").addEventListener("touchstart", clickTouchMoveBackwardPanel, false);
		document.getElementById("moveBackwardPanel").addEventListener("touchend", clickTouchMoveBackwardPanel, false);
	}
	
	else {
		document.getElementById("turnLeftPanel").addEventListener("mousedown", clickTouchTurnLeftPanel, false);
		document.getElementById("turnLeftPanel").addEventListener("mouseup", clickTouchTurnLeftPanel, false);
		
		document.getElementById("turnRightPanel").addEventListener("mousedown", clickTouchTurnRightPanel, false);
		document.getElementById("turnRightPanel").addEventListener("mouseup", clickTouchTurnRightPanel, false);
		
		document.getElementById("moveForwardPanel").addEventListener("mousedown", clickTouchMoveForwardPanel, false);
		document.getElementById("moveForwardPanel").addEventListener("mouseup", clickTouchMoveForwardPanel, false);
		
		document.getElementById("moveBackwardPanel").addEventListener("mousedown", clickTouchMoveBackwardPanel, false);
		document.getElementById("moveBackwardPanel").addEventListener("mouseup", clickTouchMoveBackwardPanel, false);
	}
	
	document.getElementById("turnLeftPanel").addEventListener("dragstart", clickTouchTurnLeftPanel, false);		
	document.getElementById("turnRightPanel").addEventListener("dragstart", clickTouchTurnRightPanel, false);	
	document.getElementById("moveForwardPanel").addEventListener("dragstart", clickTouchMoveForwardPanel, false);	
	document.getElementById("moveBackwardPanel").addEventListener("dragstart", clickTouchMoveBackwardPanel, false);
}

function onSwitchFastSlow() {
	if (document.getElementById('onoffswitchFastSlow').checked)
		changeSpeeds(distFast, speedFast, turnDistFast, turnSpeedFast);
	else
		changeSpeeds(distSlow, speedSlow, turnDistSlow, turnSpeedSlow);
}

function onSwitchTestMode() {
	if (!blocked) {
		if (document.getElementById('onoffswitchTestMode').checked)
			sendSerialCommand("TestMode On");
		else
			sendSerialCommand("TestMode Off");
	}		
	
	else {
		document.getElementById('onoffswitchTestMode').checked = !document.getElementById('onoffswitchTestMode').checked;
	}
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

function getSerialData(command) {
	var xmlHTTP = new XMLHttpRequest();
  	xmlHTTP.open("GET","php/readSerial.php?cmd=" + command.replace(/ /g, '+'), false);
	xmlHTTP.send();
	return xmlHTTP.responseText;
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

function changeSpeeds(d, s, td, ts) {
	dist = d;
	speed = s;
	turnDist = td;
	turnSpeed = ts;
}

function refreshBatteryStatus() {	
	if (!blocked) {
		sendSerialCommand("TestMode Off");
	
		var raw = getSerialData("GetCharger");	
		var lines = raw.split("\n");
		var percentValue = "-1";
		var charging = false;
		
		for(var i = 0; i < lines.length; i++) {
			if (lines[i].indexOf("FuelPercent") > - 1) 
				percentValue = lines[i].split(",")[1];	
			else if (lines[i].indexOf("ChargingEnabled") > - 1 && lines[i].split(",")[1].indexOf("1") > -1) {
				charging = true;			
			}	
		}
		
		document.getElementById("batteryPercentage").innerHTML = "" + percentValue;
		document.getElementById("batteryPercentage").style.color = charging ? "green" : "red";		
		
		if (document.getElementById('onoffswitchTestMode').checked) {
			sendSerialCommand("TestMode On");
		}
	}
}

/* ClickTouchHandlers Controls */

function clickTouchTurnLeftPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnLeftPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor -" + turnDist + " " + turnDist + " " + turnSpeed);
	}
	else {
		document.getElementById("turnLeftPanel").style.background = "";
		stopMoving();
	}	
}

function clickTouchTurnRightPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown" && !blocked) {
		document.getElementById("turnRightPanel").style.background = "rgba(255,255,255,0.7)";
		startMoving("SetMotor " + turnDist + " -" + turnDist + " " + turnSpeed);
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










