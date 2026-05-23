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
  // Deep saturated blue for the diamond body — charte graphique
  const bodyBlue   = new Color('#0E3975')   // --diamond-deep  (volume / attenuation)
  const midBlue    = new Color('#1D74E8')   // --diamond-mid   (surface base)
  const brightCyan = new Color('#7AD3FF')   // --diamond-bright (specular / highlights)

  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((m) => {
        // Dielectric — metalness must be 0 or the material renders black
        if ('metalness' in m) m.metalness = 0
        // Strong env map so HDRI reflections pop against the dark body
        if ('envMapIntensity' in m) m.envMapIntensity = 3.2
        // Mirror-smooth facets — reflections/refractions are crisp
        if ('roughness' in m) m.roughness = 0.0
        // Surface color : deep blue, NOT lerped toward white anymore.
        // White highlights will contrast strongly against this dark base.
        if (m.color) m.color.set(midBlue)
        // Transmission crystal
        if ('transmission' in m) {
          m.transmission = 0.95
          m.transparent = true
          if ('ior' in m) m.ior = 2.42             // diamond IOR
          if ('thickness' in m) m.thickness = 1.2  // thicker volume = more tint
          // attenuationColor drives the deep blue body colour seen through the diamond
          if ('attenuationColor' in m) m.attenuationColor = bodyBlue.clone()
          // Short distance = strong colour saturation inside the volume
          if ('attenuationDistance' in m) m.attenuationDistance = 0.35
          // Cyan specular so white light splits into cyan highlights (not plain white)
          if ('specularColor' in m) m.specularColor = brightCyan.clone()
          if ('specularIntensity' in m) m.specularIntensity = 1.2
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
