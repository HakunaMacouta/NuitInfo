var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xffffff, 0);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00AA11 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function listener(elem, evnt, func)
{
    if (elem.addEventListener)
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) // For IE
        return elem.attachEvent("on" + evnt, func);
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

listener(document.body, 'keydown', ev_keydown);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();