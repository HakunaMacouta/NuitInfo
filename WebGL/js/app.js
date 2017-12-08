var scene, camera, renderer;
var cssScene, cssCamera, cssRenderer;
var sky, sunSphere;

var cameraForward = new THREE.Vector3(0,0,+1);



function initGL()
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0xffffff, 0);

	camera.position.z = 5;

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function initCSS3D()
{
	cssScene = new THREE.Scene();
	cssCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	cssRenderer = new THREE.CSS3DRenderer();

	var element = document.getElementById("test");
	
	var cssObject = new THREE.CSS3DObject( element );
	cssObject.position.set(-1000,0,-500);
	cssObject.rotation.y = 90;
	cssScene.add(cssObject);

	element = document.getElementById("calendar");
	cssObject = new THREE.CSS3DObject( element );
	cssObject.position.set(1000,0,-500);
	cssObject.rotation.y = -90;
	cssScene.add(cssObject);

	cssRenderer.setSize( window.innerWidth, window.innerHeight );
	cssRenderer.domElement.style.position = 'absolute';
	cssRenderer.domElement.style.top = 0;
	
	document.body.appendChild(cssRenderer.domElement);	
}

function initAll()
{
	initGL();
	initCSS3D();
}

var cssSpeedMult = 50 ;
var MIN_Z =  30;
var MAX_Z = -50;


/** KeyDown Callback */
function ev_keydown(e)
{
	var key = e.keyCode ? e.keyCode : e.which;

	console.log(camera.position);
	
	/** UP ARROW */
	if(key === 38)
	{
		if(camera.position.z < MAX_Z)
			return;
		camera.position.x -= cameraForward.x * 1 ;
		camera.position.z -= cameraForward.z * 1 ;

		cssCamera.position.x -= cameraForward.x * cssSpeedMult ;
		cssCamera.position.z -= cameraForward.z * cssSpeedMult ;
		
	}
	/** DOWN ARROW */
	else if (key === 40)
	{
		if(camera.position.z > MIN_Z)
			return;

		camera.position.x += cameraForward.x * 1 ;
		camera.position.z += cameraForward.z * 1 ;

		cssCamera.position.x += cameraForward.x * cssSpeedMult ;
		cssCamera.position.z += cameraForward.z * cssSpeedMult ;
	}
	/** RIGHT ARROW */
	else if (key === 39)
	{
		camera.rotation.set(0, camera.rotation.y - Math.PI/2,0);
		cssCamera.rotation.set(0, camera.rotation.y - 90,0);

		console.log(cameraForward);

	}
	/** LEFT ARROW */
	else if (key === 37)
	{
		camera.rotation.set(0, camera.rotation.y + Math.PI/2,0);
		cssCamera.rotation.set(0, camera.rotation.y + 90,0);
		
		console.log(cameraForward);
	}
}

function listener(elem, evnt, func)
{
    if (elem.addEventListener)
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) // For IE
        return elem.attachEvent("on" + evnt, func);
}

listener(document.body, 'keydown', ev_keydown);

initAll();

function animate() {
	requestAnimationFrame( animate ); 

	cssRenderer.render( cssScene, cssCamera);
	renderer.render( scene, camera );
}

animate();