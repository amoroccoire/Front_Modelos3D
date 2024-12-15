import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } from "three";

interface ZipModelViewerProps {
  zipUrl: string; // URL del archivo .zip
}

export const Model: React.FC<ZipModelViewerProps> = ({ zipUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModelFromZip = async () => {
      try {
        setLoading(true);

        const response = await fetch(zipUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          method: 'GET',
          redirect :'manual',
        });
        console.log("Respuesta del fetch:", response);
        if (!response.ok) {
          throw new Error(`Fetch falló con status: ${response.status}`);
        }
        console.log(response);
        console.log("EN RESPONSE de obtener oj y mt file")
        const zipBlob = await response.blob();
        const zip = await JSZip.loadAsync(zipBlob);
        console.log("ANTES de obtener oj y mt file");
        // Buscar los archivos .obj y .mtl en el archivo zip
        const objFile = Object.keys(zip.files).find((file) => file.endsWith(".obj"));
        const mtlFile = Object.keys(zip.files).find((file) => file.endsWith(".mtl"));
        console.log("Despues de obtener oj y mt file");
        if (!objFile || !mtlFile) {
          throw new Error("No se encontraron archivos .obj o .mtl en el zip.");
        }

        // Leer los archivos .mtl y .obj
        const mtlContent = await zip.files[mtlFile].async("text");
        const objContent = await zip.files[objFile].async("text");

        // Crear la escena Three.js
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Cargar materiales con MTLLoader
        const mtlLoader = new MTLLoader();
        const materials = mtlLoader.parse(mtlContent, "");
        materials.preload();

        // Cargar modelo .obj con OBJLoader
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        const obj = objLoader.parse(objContent);

        // Agregar modelo y luz a la escena
        scene.add(obj);
        const light = new AmbientLight(0xffffff, 0.5);
        scene.add(light);

        // Configurar cámara y renderizar
        camera.position.z = 5;
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadModelFromZip();

    return () => {
      // Limpia el canvas al desmontar el componente
      const canvas = document.querySelector("canvas");
      if (canvas) {
        document.body.removeChild(canvas);
      }
    };
  }, [zipUrl]);

  if (loading) return <p>Cargando modelo...</p>;
  if (error) return <p>Error: {error}</p>;

  return null; // El modelo se renderiza directamente en el canvas
};
