import * as THREE from 'three';
import { app } from './main.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { CardImage } from './lib/CardImage.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CardImage from './libraries/CardImage.js';

const loader = new GLTFLoader();
var models = {
    player: {

    },
    object: {
        
    }
};

// Загружаем модели игроков
for(let playerModel of ["fishka","pig"])
{
    loader.load(`./assets/models/${playerModel}.glb`, function ( gltf ) {
        models.player[playerModel] = gltf.scene;
    }, undefined, function ( error ){
        console.error( error );
    } );
}

// Загружаем игровые модели
for(let object of ["house","jail"])
{
    loader.load(`./assets/models/${object}.glb`, function ( gltf ) {
        models.object[object] = gltf.scene;
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(-260,275,306); // Set camera position
camera.rotation.set(-1.569,-0.995,-1.569);

var light = new THREE.DirectionalLight(0xFFFFFF, 5);
light.position.set(300,100,300).normalize();
light.protected = true;

var lightTarget = new THREE.Object3D();
lightTarget.position.set(300, 0, 300);
lightTarget.protected = true;
light.target = lightTarget;

scene.add( light );

var alight = new THREE.AmbientLight( 0xFFFFFF, 0.7 );
alight.protected = true;
scene.add( alight );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xE1E1E1);
document.body.appendChild(renderer.domElement);

var cards_created = false;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(300, 0, 300); // Set orbit control center

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Render loop
function animate() {

    // Удаляем всех игроков
    scene.children.forEach(child => {
        if (child.hasOwnProperty("isPlayer") && child.isPlayer == true) scene.remove(child);
    });

    // Создаем названия карточек куда ходит игрок только если их еще нет
    if(app.need_update && app.cards.length > 0)
    {
        // Удаляем все карты и дома т.к. мы ререндерим по факту покупку домов
        scene.children.forEach(child => {
            if (child.hasOwnProperty("isCard") && child.isCard == true) scene.remove(child);
            if (child.hasOwnProperty("isHouse") && child.isHouse == true) scene.remove(child);
        });

        // Заново рисуем все карты
        for(let c in app.cards)
        {
            const cpos = app.getBoardPositionByTurn(c);
            const type = (c == 10 || c == 20 || c == 30 || c == 0) ? "square" : "default";

            let texture = new THREE.CanvasTexture(new CardImage(app.cards[c], type).canvas);
            let geometry = new THREE.PlaneGeometry( type == "square" ? 90 : 47, 90);
            let material = new THREE.MeshStandardMaterial({ map: texture });
            let card = new THREE.Mesh(geometry, material);

            card.position.set(cpos.x, 0, cpos.y);

            card.rotation.x = -90 * (Math.PI / 180);
            card.receiveShadow = true;
            card.isCard = true;

            if(c > 0  && 10 > c) card.rotation.z = -90 * (Math.PI / 180);
            //if(c > 10 && 20 > c) card.rotation.z = -90 * (Math.PI / 180);
            if(c > 20 && 30 > c) card.rotation.z =  90 * (Math.PI / 180);
            if(c > 30 && 40 > c) card.rotation.z = 180 * (Math.PI / 180);
            
            card.protected = true;

            scene.add(card);
        }


        // Рисуем домики у карточек (когда научимся работать с моделями, а пока...)
        for(let i in app.cards)
        {
            // Если у карты есть дома и моделька дома загружаема
            if(app.cards[i].level > 0  && models.object.hasOwnProperty("house"))
            {
                const card      = app.cards[i];
                const origin    = app.getBoardPositionByTurn(i);
                const positions = app.getPositionsInCircleOf(origin,12,app.cards[i].level);
                const material  = new THREE.MeshStandardMaterial({ color: parseInt(app.cards[i].color.replace(/[^A-Fa-f0-9]/g,""),16) });

                // Определяем сдвиг по колличеству домиков
                const shift = ((12 * card.level) / 2) - 6;

                // Определяем сдвиг по стороне на которой стоит карта
                const offset = ( (i > 10 && 20 > i) || (i > 20 && 30 > i) ) ? 25 : -25;

                // Рисуем домики колличественно
                for(let house = 0; house < card.level; house++)
                {
                    let building = models.object.house.clone();
                    building.traverse((mesh) => {
                        mesh.material = material;
                    });

                    if(
                        (i > 0 && 10 > i) || (i > 20 && 30 > i)
                    ) {
                        building.position.set(
                            origin.x + offset,
                            0,
                            (origin.y - shift) + house * 12
                        );
                    } else {
                        building.position.set(
                            (origin.x - shift) + house * 12,
                            0,
                            origin.y + offset,
                        );
                    }

                    building.scale.set(5,5,5);
                    building.isHouse = true;

                    scene.add(building);
                }
            }
        }

        // Отключаем перерисовку
        app.need_update = false;
    }


    let slots = app.playersGroupedByFolds();

    // Рисуем игроков на позициях
    for(let s of Object.keys(slots))
    {
        if(Array.isArray(slots[s]))
        {
            const origin = app.getBoardPositionByTurn(s);
            const positions = app.getPositionsInCircleOf(origin,20,slots[s].length);

            for(let i in slots[s])
            {
                const p = slots[s][i];

                if(models.player.hasOwnProperty(p.model))
                {
                    const material = new THREE.MeshStandardMaterial({ color: parseInt(p.color.replace(/[^A-Fa-f0-9]/g,""),16) });

                    let player = models.player[p.model].clone();

                    player.traverse((mesh) => {
                        mesh.material = material;
                    });

                    player.isPlayer = true;
                    player.scale.set(10,10,10);
                    player.position.x = positions[i].x;
                    player.position.y = (p.turnover > 0) ? 50 : 0; // Если чел еще ходит то фишка летает в воздухе типа
                    player.position.z = positions[i].y;

                    // Добавляем игрока на сцену
                    scene.add(player);

                    // Если игрок в тюрьме то рисуем над ним решетку
                    if(p.jailed && models.object.hasOwnProperty("jail"))
                    {
                        const mat = new THREE.MeshStandardMaterial({ color: 0x888888 });
                        let jail = models.object.jail.clone();
                        jail.traverse((mesh) => {
                            mesh.material = mat;
                        });

                        jail.isPlayer = true;  // Это обьект игрока поэтому он будет так-же ререндерится
                        jail.scale.set(10,10,10);
                        jail.position.x = positions[i].x;
                        jail.position.y = 0;
                        jail.position.z = positions[i].y;

                        // Добавляем игрока на сцену
                        scene.add(jail);
                    }
                }
            }
        }
    }

    // Обновляем визуал всего этого говна
    requestAnimationFrame(animate);
    controls.update(); // Update orbit controls
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
animate();
setInterval(() => {
    //app.render();
    app.notifications.tickUpdate();
},200);
app.client.connect();