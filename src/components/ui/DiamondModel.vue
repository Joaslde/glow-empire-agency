<script setup>
import { useGLTF } from '@tresjs/cientos'
import { watchEffect, shallowRef } from 'vue'
import { Box3, Vector3, Color } from 'three'

const { state } = useGLTF('/blue_diamond.glb', { draco: false })
const processedScene = shallowRef(null)

watchEffect(() => {
  const gltf = state.value
  if (!gltf?.scene || processedScene.value) return

  const scene = gltf.scene

  // Normalize to ~2.4 units max dimension
  const box = new Box3().setFromObject(scene)
  const size = new Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  scene.scale.setScalar(2.4 / maxDim)

  // Re-center pivot at origin for clean rotation
  const newBox = new Box3().setFromObject(scene)
  const center = new Vector3()
  newBox.getCenter(center)
  scene.position.sub(center)

  // Polish materials — blue crystal diamond, dielectric (NOT metallic), high IOR.
  // Crucial : a metallic material with low roughness and no env map renders BLACK.
  const brandBlue = new Color('#1D74E8')        // --diamond-mid
  const palBlueTint = new Color('#7AD3FF')      // --diamond-bright (surface tint)
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((m) => {
        // Diamond is a dielectric : force metalness to 0
        if ('metalness' in m) m.metalness = 0
        // Boost env reflections (HDRI provides them)
        if ('envMapIntensity' in m) m.envMapIntensity = 2.6
        // Crystal-smooth surface
        if ('roughness' in m) m.roughness = 0.05
        // Surface tint : very pale icy blue (white-leaning so it stays luminous)
        if (m.color) m.color.copy(palBlueTint).lerp(new Color(0xffffff), 0.55)
        // If the GLB material supports transmission (MeshPhysicalMaterial), make it blue diamond
        if ('transmission' in m) {
          m.transmission = Math.max(m.transmission ?? 0, 0.92)
          m.transparent = true
          if ('ior' in m) m.ior = 2.4              // diamond IOR
          if ('thickness' in m) m.thickness = 0.8  // volume for refraction
          // attenuationColor + short distance = volumetric blue tint when light passes through
          if ('attenuationColor' in m) m.attenuationColor = brandBlue.clone()
          if ('attenuationDistance' in m) m.attenuationDistance = 0.6
          // Subtle blue specular tint on highlights
          if ('specularColor' in m) m.specularColor = palBlueTint.clone()
          if ('specularIntensity' in m) m.specularIntensity = 1
        }
        m.needsUpdate = true
      })
    }
  })

  processedScene.value = scene
})

defineExpose({
  get scene() { return processedScene.value }
})
</script>

<template>
  <primitive v-if="processedScene" :object="processedScene" />
</template>
