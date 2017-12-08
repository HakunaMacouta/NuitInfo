var scene, camera, renderer, geometry, material, cube, light;
var stopLight, controls, building, building2, road, roads;
var cssScene, cssCamera, cssRenderer;

var cameraForward = new THREE.Vector3(0,0,+1);

function deepCopy(oldObj) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (var i in oldObj) {
            newObj[i] = deepCopy(oldObj[i]);
        }
    }
    return newObj;
}

function initGL()
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0xffffff, 0);

	camera.position.z = 200;

    light = new THREE.AmbientLight( 0xcccccc ); // soft white light
    scene.add( light );

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

var arrayPages = [];
function initCSS3D() {
    cssScene = new THREE.Scene();
    cssCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    cssRenderer = new THREE.CSS3DRenderer();

    var element = document.getElementById("test");

    var cssObject = new THREE.CSS3DObject( element );
    cssObject.position.set(-6000,0,-8000);
    cssObject.rotation.y =  Math.PI/2;
	cssScene.add(cssObject);
	arrayPages.push(cssObject);

    element = document.getElementById("calendar");
    cssObject = new THREE.CSS3DObject( element );
    cssObject.position.set(500,0,-5000);
	cssObject.rotation.y = -90;
	cssObject.element.style.display = 'none';
    cssScene.add(cssObject);
	arrayPages.push(cssObject);

    cssRenderer.setSize( window.innerWidth, window.innerHeight );
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;

    document.body.appendChild(cssRenderer.domElement);
}


function initSky() {
    scene.background = new THREE.CubeTextureLoader()
        .setPath( 'img/' )
        .load( [
            'pr_bk.png',
            'pr_lf.png',
            'pr_up.png',
            'pr_dn.png',
            'pr_ft.png',
            'pr_rt.png'
        ] );
    scene.background.minFilter = THREE.LinearFilter;
}

function initStopLight() {
    stopLight = new THREE.MTLLoader();
    stopLight.load( 'models/stop_Light.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'models/stop_Light.obj', function ( object ) {
            object.position.y = -95;
            object.rotation.y = 20;
            scene.add( object );
        });
    });
}

function initBuilding() {
    building = new THREE.MTLLoader();
    building.load( 'models/building_2/materials.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'models/building_2/model.obj', function ( object ) {
            object.scale.set(100,100,100);
            object.position.x = 100;
            scene.add( object );
        });
    });

    building2 = new THREE.MTLLoader();
    building2.load( 'models/building_1/materials.mtl', function( materials ) {
        materials.preload();
        var obj = new THREE.OBJLoader();
        obj.setMaterials( materials );
        obj.load( 'models/building_1/model.obj', function ( object ) {
            object.scale.set(100,100,100);
            object.position.x = -100;
            scene.add( object );
        });
    });
}

var last=-2;
function initRoad() {
	for(var i=0;i<10;i++)
	{

    road = new THREE.MTLLoader();
    road.load( 'models/road/materials.mtl', function( materials ) {
        materials.preload();
        var obj = new THREE.OBJLoader();
        obj.setMaterials( materials );
        obj.load( 'models/road/model.obj', function ( object ) {
            var instance;
				instance = object;
                instance.scale.set(100,100,100);
                instance.position.y = -50;
                instance.rotation.y = Math.PI/2;
				instance.position.z = last*-65;
				last++;
                scene.add( instance );

        });
    });
}
}

function initAll()
{
	initGL();
	initSky();
	initBuilding();
	initRoad();
	initStopLight();
	initCSS3D();
}

var cssSpeedMult = 50 ;
var MIN_Z =  200;
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
		cssCamera.rotation.y -= Math.PI/2;

		console.log(cameraForward);

	}
	/** LEFT ARROW */
	else if (key === 37)
	{
		camera.rotation.set(0, camera.rotation.y + Math.PI/2,0);
		cssCamera.rotation.y += Math.PI/2;
		
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

    renderer.render( scene, camera );
	cssRenderer.render( cssScene, cssCamera);
}

animate();