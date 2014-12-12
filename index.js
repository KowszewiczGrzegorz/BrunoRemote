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

    // Must include this line - specifies the response type we want
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e)
    {
        var arr = new Uint8Array(this.response);
        // Convert the int array to a binary string
        // We have to use apply() as we are converting an *array*
        // and String.fromCharCode() takes one or more single values, not
        // an array.
        var raw = String.fromCharCode.apply(null,arr);
        // This works!!!
        var b64=btoa(raw);
        var dataURL="data:image/jpeg;base64,"+b64;
        document.getElementById("camPic").src = dataURL;
        setTimeout(function () { updateCam(); }, 1000);
    };

    xmlHTTP.send();
		
	//document.getElementById("camPic").src = "/php/camPic.php?" + new Date().getTime();
}



/* ClickTouchHandlers Controls */

function clickTouchTurnLeftPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown") {
		document.getElementById("turnLeftPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("turnLeftPanel").style.background = "";
	}	
}

function clickTouchTurnRightPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown") {
		document.getElementById("turnRightPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("turnRightPanel").style.background = "";
	}	

}

function clickTouchMoveForwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown") {
		document.getElementById("moveForwardPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("moveForwardPanel").style.background = "";
	}	

}

function clickTouchMoveBackwardPanel(e) {
	if (e.type == "touchstart" || e.type == "mousedown") {
		document.getElementById("moveBackwardPanel").style.background = "rgba(255,255,255,0.7)";
	}
	else {
		document.getElementById("moveBackwardPanel").style.background = "";
	}	

}











