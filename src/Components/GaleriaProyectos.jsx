import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const GaleriaProyectos = ({ listaProyectos }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [mounted, setMounted] = useState(false);

  // 1. Hidratación segura para Astro
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 2. Bloquear el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (proyectoSeleccionado) {
      document.body.style.overflow = 'hidden'; // Congela el fondo
    } else {
      document.body.style.overflow = 'unset'; // Libera el fondo
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [proyectoSeleccionado]);

  return (
    <section className="w-full px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-text-primary font-heading">
        Mis Proyectos
      </h2>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {listaProyectos.map((proyecto) => (
          <div 
            key={proyecto.id}
            onClick={() => setProyectoSeleccionado(proyecto)}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden">
              <img src={proyecto.imagen} alt={proyecto.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{proyecto.titulo}</h3>
              <p className="text-gray-600 text-sm">{proyecto.descripcionCorta}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {proyecto.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. EL PORTAL MÁGICO 
         Esto "teletransporta" el modal fuera de tu Layout con blur.
         Así ocupa toda la pantalla real y no se corta.
      */}
      {mounted && proyectoSeleccionado && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setProyectoSeleccionado(null)}
        >
          {/* CONTENEDOR DEL MODAL
             max-h-[90vh]: Altura máxima del 90% de la pantalla
             overflow-y-auto: Si el contenido es muy largo, scrollea AQUÍ dentro.
          */}
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Cabecera con Imagen (Fija al hacer scroll interno si quisieras, pero aquí scrollea con todo) */}
            <div className="relative h-64 shrink-0">
              <img src={proyectoSeleccionado.imagen} alt={proyectoSeleccionado.titulo} className="w-full h-full object-cover"/>
              <button 
                onClick={() => setProyectoSeleccionado(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Contenido Scrolleable (overflow-y-auto aquí si quieres header fijo, o en el padre) */}
            <div className="p-8 overflow-y-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{proyectoSeleccionado.titulo}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proyectoSeleccionado.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {proyectoSeleccionado.descripcionLarga}
              </p>

              <a 
                href={proyectoSeleccionado.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors w-full justify-center md:w-auto"
              >
                <span>Ver Proyecto</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>
        </div>,
        document.body // <-- Destino del Portal
      )}
    </section>
  );
};