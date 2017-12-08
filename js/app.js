var scene, camera, renderer, geometry, material, cube, light;
var stopLight, controls, building, building2, road, roads;
var cssScene, cssCamera, cssRenderer;

var cameraForward = new THREE.Vector3(0,0,+1);
/*
function request(url, div)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            if("NOP" !== xhttp.responseText)
            {
                var cal = document.getElementById("calendar");
            }

            if(activeDiv !== null)
            {
                setInactive(activeDiv);
            }
            setActive(div);
            activeDiv = div;
        }
    };
    xhttp.open("GET", "http://hakunamcouta.fr/nuitdelinfo/"+, true);
    xhttp.send();
}*/

function initGL()
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0xffffff, 0);

	camera.position.z = 200;
	camera.position.y = -20;

    light = new THREE.AmbientLight( 0xcccccc ); // soft white light
    scene.add( light );

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function initCSS3D() {
    cssScene = new THREE.Scene();
    cssCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    cssRenderer = new THREE.CSS3DRenderer();

    var element;
    var sign=1;
    var nbPages = 5;
    var page = "page";
    for(var i=0;i<nbPages;i++)
    {
        sign = i%2===0?1:-1;
        element = document.getElementById(page.concat(i+1));
        cssObject = new THREE.CSS3DObject( element );
        cssObject.position.set(700*sign,0,-1000*i);
        cssObject.rotation.y = Math.PI/2 * -sign;
        cssScene.add(cssObject);
    }

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

function initStopLight(posY, posX, rotZ) {
    stopLight = new THREE.MTLLoader();
    stopLight.load( 'models/stop_Light.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'models/stop_Light.obj', function ( object ) {
            object.scale.set(0.5,0.5,0.5);
            object.position.y = -60;
            object.position.x = -25;
            object.rotation.y = Math.PI/2;
            scene.add( object );
        });
    });
}
function initBuilding() {
    var  rnd, zPos;
    var offset = 50;
    for (var i = 0; i < 12; i++) {
        rnd = Math.round(Math.random());
        zPos = 150 - (i*52);
        generateBuilding(rnd, zPos, offset);
    }
    for(var j = 0; j< 12; j++) {
        rnd = Math.round(Math.random());
        zPos = 150 - (j*52);
        generateBuilding(rnd, zPos, -offset);
    }
}

function generateBuilding(rnd, zPos, offset) {
    building = new THREE.MTLLoader();
    building.load((rnd === 0) ? 'models/building_2/materials.mtl' : 'models/building_1/materials.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            rnd === 0 ? 'models/building_2/model.obj' : 'models/building_1/model.obj', function (object) {
                object.scale.set(70, 70, 70);
                object.position.x = rnd === 0 ? offset : offset;
                object.position.y = rnd === 0 ? 0 : -28;
                object.position.z = zPos;
                scene.add(object);
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

var z = [ 1 , 0 , -1, 0];
var counter = 5000;
var keyVar = [38, 39, 40, 37];


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
            
		camera.position.z -= z[counter%4] * 1 ;

		cssCamera.position.z -= z[counter%4] * cssSpeedMult ;

	}
	/** DOWN ARROW */
	else if (key === 40)
	{
		if(camera.position.z > MIN_Z)
			return;

		camera.position.z += z[counter%4] * 1 ;

		cssCamera.position.z += z[counter%4] * cssSpeedMult ;
	}
	/** RIGHT ARROW */
	else if (key === 39)
	{
		camera.rotation.set(0, camera.rotation.y - Math.PI/2,0);
        cssCamera.rotation.y -= Math.PI/2;
        counter++;

	}
	/** LEFT ARROW */
	else if (key === 37)
	{
		camera.rotation.set(0, camera.rotation.y + Math.PI/2,0);
        cssCamera.rotation.y += Math.PI/2;
        counter--;
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