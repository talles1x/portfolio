"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

export type CarSceneHandle = {
  rotate: (dir: 1 | -1) => void;
  reset: () => void;
};

type Props = {
  paint: string;
  lights: boolean;
  autoRotate: boolean;
  reducedMotion: boolean;
  onUserRotate: () => void;
};

/* ---------- Geometria do carro (coupé conceito feito à mão) ---------- */

function useBodyGeometry() {
  return useMemo(() => {
    // perfil lateral: frente no +x, de baixo para cima
    const s = new THREE.Shape();
    s.moveTo(-2.2, 0.3);
    s.lineTo(-1.94, 0.3);
    s.absarc(-1.42, 0.37, 0.52, Math.PI, 0, true); // caixa de roda traseira
    s.lineTo(-0.9, 0.3);
    s.lineTo(0.9, 0.3);
    s.absarc(1.42, 0.37, 0.52, Math.PI, 0, true); // caixa de roda dianteira
    s.lineTo(1.94, 0.3);
    s.lineTo(2.1, 0.3);
    s.quadraticCurveTo(2.36, 0.3, 2.36, 0.48);
    s.quadraticCurveTo(2.36, 0.62, 2.14, 0.68);
    s.quadraticCurveTo(1.4, 0.78, 0.62, 0.84);
    s.lineTo(-1.6, 0.86);
    s.quadraticCurveTo(-2.2, 0.88, -2.3, 0.72);
    s.quadraticCurveTo(-2.34, 0.38, -2.2, 0.3);
    const depth = 1.62;
    const g = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 32,
    });
    g.translate(0, 0, -depth / 2);
    g.computeVertexNormals();
    return g;
  }, []);
}

function useCabinGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.66, 0.8);
    s.quadraticCurveTo(0.15, 1.12, -0.25, 1.22);
    s.quadraticCurveTo(-0.7, 1.28, -1.1, 1.18);
    s.quadraticCurveTo(-1.6, 1.0, -1.95, 0.82);
    s.lineTo(0.66, 0.8);
    const depth = 1.28;
    const g = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 8,
      curveSegments: 32,
    });
    g.translate(0, 0, -depth / 2);
    g.computeVertexNormals();
    return g;
  }, []);
}

function Wheel({ position }: { position: [number, number, number] }) {
  const side = position[2] > 0 ? 1 : -1;
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.37, 0.37, 0.28, 48]} />
        <meshStandardMaterial color="#0d0d10" roughness={0.85} />
      </mesh>
      {/* aro */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, side * 0.142]}>
        <cylinderGeometry args={[0.27, 0.27, 0.01, 48]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.6} roughness={0.35} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0, side * 0.15]} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
          <boxGeometry args={[0.05, 0.5, 0.02]} />
          <meshStandardMaterial color="#c9ccd3" metalness={1} roughness={0.25} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, side * 0.16]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
        <meshStandardMaterial color="#c9ccd3" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Car({ paint, lights }: { paint: string; lights: boolean }) {
  const body = useBodyGeometry();
  const cabin = useCabinGeometry();
  const paintMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const target = useMemo(() => new THREE.Color(paint), [paint]);
  const head = useRef<THREE.MeshStandardMaterial>(null);

  // troca de cor e faróis com transição curta (feedback imediato, sem "pulo")
  useFrame((_, dt) => {
    paintMat.current?.color.lerp(target, Math.min(1, dt * 10));
    if (head.current) {
      const goal = lights ? 6 : 0.4;
      head.current.emissiveIntensity += (goal - head.current.emissiveIntensity) * Math.min(1, dt * 12);
    }
  });

  return (
    <group position={[0, 0.06, 0]}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={paintMat}
          color={paint}
          metalness={0.55}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>
      <mesh geometry={cabin} castShadow>
        <meshPhysicalMaterial color="#060609" metalness={0.3} roughness={0.08} clearcoat={1} envMapIntensity={0.5} />
      </mesh>

      {/* fundo das caixas de roda (não deixa ver através do carro) */}
      {[1.42, -1.42].map((x) => (
        <mesh key={x} position={[x, 0.55, 0]}>
          <boxGeometry args={[1.0, 0.42, 1.5]} />
          <meshStandardMaterial color="#050507" roughness={1} />
        </mesh>
      ))}
      {/* entrada de ar frontal */}
      <mesh position={[2.38, 0.42, 0]}>
        <boxGeometry args={[0.04, 0.16, 1.2]} />
        <meshStandardMaterial color="#050507" roughness={0.6} />
      </mesh>
      {/* faróis */}
      {[0.58, -0.58].map((z) => (
        <mesh key={z} position={[2.3, 0.6, z]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.05, 0.06, 0.42]} />
          <meshStandardMaterial ref={z > 0 ? head : undefined} color="#ffffff" emissive="#dfe7ff" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* lanterna traseira em faixa */}
      <mesh position={[-2.35, 0.74, 0]}>
        <boxGeometry args={[0.03, 0.05, 1.5]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#ff1a1a" emissiveIntensity={lights ? 3 : 1.2} />
      </mesh>
      {/* retrovisores */}
      {[0.98, -0.98].map((z) => (
        <mesh key={z} position={[0.5, 0.9, z]} castShadow>
          <boxGeometry args={[0.16, 0.09, 0.14]} />
          <meshStandardMaterial color="#07070a" roughness={0.3} />
        </mesh>
      ))}

      <Wheel position={[1.42, 0.37, 0.86]} />
      <Wheel position={[1.42, 0.37, -0.86]} />
      <Wheel position={[-1.42, 0.37, 0.86]} />
      <Wheel position={[-1.42, 0.37, -0.86]} />

      {lights && (
        <>
          <spotLight position={[2.4, 0.6, 0.58]} target-position={[6, 0, 0.8]} angle={0.5} penumbra={0.8} intensity={30} color="#dfe7ff" />
          <spotLight position={[2.4, 0.6, -0.58]} target-position={[6, 0, -0.8]} angle={0.5} penumbra={0.8} intensity={30} color="#dfe7ff" />
        </>
      )}
    </group>
  );
}

/* ---------- Cena ---------- */

/** No celular, arrastar na horizontal gira o carro e na vertical a página continua rolando. */
function TouchScroll() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const id = window.setTimeout(() => (gl.domElement.style.touchAction = "pan-y"), 0);
    return () => window.clearTimeout(id);
  }, [gl]);
  return null;
}

function AutoRotate({
  controls,
  enabled,
}: {
  controls: React.RefObject<CameraControls | null>;
  enabled: boolean;
}) {
  useFrame((_, dt) => {
    if (enabled) controls.current?.rotate(dt * 0.25, 0, false);
  });
  return null;
}


/** Afasta a câmera em telas mais estreitas para o carro caber inteiro. */
function Rig({
  controls,
  reducedMotion,
  onUserRotate,
}: {
  controls: React.RefObject<CameraControls | null>;
  reducedMotion: boolean;
  onUserRotate: () => void;
}) {
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const distance = aspect < 1.45 ? 9 : 6.8;
  return (
    <CameraControls
      ref={controls}
      minDistance={distance}
      maxDistance={distance}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.15}
      smoothTime={reducedMotion ? 0 : 0.25}
      onStart={onUserRotate}
      // roda do mouse e pinça desativados: rolar a página nunca fica preso no 3D
      mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 0 }}
      touches={{ one: 64, two: 0, three: 0 }}
    />
  );
}

export const CarScene = forwardRef<CarSceneHandle, Props>(function CarScene(
  { paint, lights, autoRotate, reducedMotion, onUserRotate },
  ref,
) {
  const controls = useRef<CameraControls>(null);

  useImperativeHandle(ref, () => ({
    rotate: (dir) => controls.current?.rotate(dir * (Math.PI / 4), 0, !reducedMotion),
    reset: () => controls.current?.reset(!reducedMotion),
  }));

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.2, 2.1, 5.2], fov: 32 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0b0f"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />

      <Car paint={paint} lights={lights} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial color="#111116" roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.75} scale={10} blur={2.4} far={2} />

      {/* estúdio de luz feito com painéis, sem baixar arquivos externos */}
      <Environment resolution={256}>
        <Lightformer intensity={2.5} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={1.2} position={[-5, 1.5, -2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1.2} position={[5, 1.5, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={0.6} position={[0, 1, -6]} scale={[10, 2, 1]} />
      </Environment>

      <Rig controls={controls} reducedMotion={reducedMotion} onUserRotate={onUserRotate} />
      <AutoRotate controls={controls} enabled={autoRotate} />
      <TouchScroll />
    </Canvas>
  );
});
