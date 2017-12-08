var scene, camera, renderer, geometry, material, cube, light;
var stopLight, sky, sunSphere, tree1, tree2, tree3, controls, building, building2;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0xffffff, 0);

    light = new THREE.AmbientLight( 0xcccccc ); // soft white light
    scene.add( light );

    controls = new THREE.OrbitControls( camera );
    camera.position.set( 0, 20, 50 );
    controls.update();


    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    initBuilding();
    initStopLight();
    initSky();
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

function listener(elem, event, func)
{
    if (elem.addEventListener)
        elem.addEventListener(event,func,false);
    else if (elem.attachEvent) // For IE
        return elem.attachEvent("on" + event, func);
}

function ev_keydown(e)
{
	var key = e.keyCode ? e.keyCode : e.which;
		
	if(key === 38)
	{
		camera.position.z += 1 ;
	}
	else if (key === 40)
	{
		camera.position.z -= 1;
	}
	else if (key === 39)
	{
		camera.rotation.y += 0.1;
	}
	else if (key === 37)
	{
		camera.rotation.y -= 0.1;
	}
}

function animate() {
    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
}

listener(document.body, 'keydown', ev_keydown);

init();
animate();