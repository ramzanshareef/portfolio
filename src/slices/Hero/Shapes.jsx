"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { useState, useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";

export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0 md:p-12">
            <Canvas
                className="z-0"
                shadows
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
            >
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}
                    />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}


function Geometries() {
    const geometries = [
        {
            position: [0, 0, 4],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(2.4),
        },
        {
            position: [1.2, -1.5, 3.5],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16),
        },
        {
            position: [-1.5, 0.4, 2.5],
            r: 0.5,
            geometry: new THREE.TorusKnotGeometry(1, 0.3, 8, 6),
        },
        {
            position: [1.5, 0.4, 2.5],
            r: 0.6,
            geometry: new THREE.TorusGeometry(1, 0.3, 8, 6),
        },
        {
            position: [-1, -1.2, 3.2],
            r: 0.4,
            geometry: new THREE.BoxGeometry(0.8, 0.8, 0.8),
        },
    ]

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0, metalness: 1}),
        new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.4, metalness: 0.5}),
        new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3, metalness: 0.5}),
        new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.1, metalness: 0.5}),
        new THREE.MeshStandardMaterial({ color: 0x5758BB, roughness: 0.2, metalness: 0.5}),
        new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.3, metalness: 0.5}),

    ]

    const soundEffects = [
        new Audio("/audio/1.ogg"),
        new Audio("/audio/2.ogg"),
        new Audio("/audio/3.ogg"),
    ];

    return geometries.map(({ position, r, geometry }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p)=>p * 2)}
            geometry={geometry}
            soundEffects={soundEffects}
            materials={materials}
            r={r}
        />
    ))
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);

    const startingMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }
    function handleClick(e) {
        const mesh = e.object;

        (gsap.utils.random(soundEffects)).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1, 0.3)",
            yoyo: true,
        });
        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    }
    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    }

    useEffect(() => {
        let ctx = gsap.context(()=>{
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: "expo"
            })
        })
        return ()=> ctx.revert();
    }, []);

    return (
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}
            >
                <mesh
                    geometry={geometry}
                    material={startingMaterial}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                />
            </Float>

        </group>
    )

}