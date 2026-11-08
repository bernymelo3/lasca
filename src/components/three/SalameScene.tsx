import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import { SalameLog, SalameSlice } from "./Salame";
import { flavors } from "@/data/flavors";

const classic = flavors.find((f) => f.id === "classico")!;

const REST: [number, number, number] = [0.22, 0.92, 0];
const FROM_YAW = 0.68;

/** Turns a few degrees into place, then the canvas stops drawing. */
function Settle({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const reduce = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  useEffect(() => {
    const group = ref.current;
    if (!group) return;

    if (reduce) {
      group.rotation.set(...REST);
      group.position.y = 0;
      invalidate();
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 800);
      const e = 1 - (1 - t) ** 3;
      group.rotation.set(REST[0], FROM_YAW + (REST[1] - FROM_YAW) * e, REST[2]);
      group.position.y = -0.08 * (1 - e);
      invalidate();
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [invalidate, reduce]);

  return (
    <group ref={ref} rotation={reduce ? REST : [REST[0], FROM_YAW, REST[2]]}>
      {children}
    </group>
  );
}

export function SalameScene() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0.15, 0.2, 7.6], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3.5, 5, 4]} intensity={1.7} color="#fff6e6" />
        <directionalLight position={[-4, 1.5, -2]} intensity={0.35} color="#ffe9c9" />

        <Settle>
          <group position={[0.35, 0.12, 0]} scale={0.68}>
            <SalameLog
              base={classic.base}
              speckle={classic.speckle}
              crust={classic.crust}
              length={2.7}
              radius={0.78}
              seed={7}
            />
            <SalameSlice
              base={classic.base}
              speckle={classic.speckle}
              crust={classic.crust}
              radius={0.58}
              seed={19}
              position={[0.55, -0.5, 1.15]}
              rotation={[0.4, -0.05, -0.18]}
            />
          </group>
        </Settle>

        <ContactShadows
          frames={50}
          position={[0, -0.85, 0]}
          opacity={0.2}
          scale={6}
          blur={2.8}
          far={3.5}
          color="#4a2f22"
        />
      </Suspense>
    </Canvas>
  );
}
