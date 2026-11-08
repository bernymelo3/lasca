import { useMemo } from "react";
import { makeCrossTexture, makeCrustTexture } from "./textures";

type SalameProps = {
  base: string;
  speckle: string;
  crust: string;
  radius?: number;
  length?: number;
  seed?: number;
};

/** A salame log lying on its side, cut face toward the camera. */
export function SalameLog({
  base,
  speckle,
  crust,
  radius = 0.92,
  length = 3.1,
  seed = 7,
}: SalameProps) {
  const cross = useMemo(() => makeCrossTexture(base, speckle, seed), [base, speckle, seed]);
  const crustTex = useMemo(() => makeCrustTexture(crust, seed + 1), [crust, seed]);

  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[radius, radius, length, 48, 1]} />
      <meshStandardMaterial attach="material-0" map={crustTex} color={crust} roughness={0.92} metalness={0} />
      <meshStandardMaterial attach="material-1" map={cross} roughness={0.62} metalness={0} />
      <meshStandardMaterial attach="material-2" map={cross} roughness={0.62} metalness={0} />
    </mesh>
  );
}

/** One cut slice, resting beside the log. */
export function SalameSlice({
  base,
  speckle,
  crust,
  radius = 0.72,
  seed = 12,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: SalameProps & {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const cross = useMemo(() => makeCrossTexture(base, speckle, seed), [base, speckle, seed]);
  const crustTex = useMemo(() => makeCrustTexture(crust, seed + 1), [crust, seed]);

  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, 0.14, 48, 1]} />
        <meshStandardMaterial attach="material-0" map={crustTex} color={crust} roughness={0.92} />
        <meshStandardMaterial attach="material-1" map={cross} roughness={0.6} />
        <meshStandardMaterial attach="material-2" map={cross} roughness={0.6} />
      </mesh>
    </group>
  );
}
