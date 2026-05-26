import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const GaleriaProyectos = ({ listaProyectos }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const manejarTeclaEsc = (e) => {
      if (e.key === 'Escape') setProyectoSeleccionado(null);
    };
    if (proyectoSeleccionado) {
      window.addEventListener('keydown', manejarTeclaEsc);
    }
    return () => window.removeEventListener('keydown', manejarTeclaEsc);
  }, [proyectoSeleccionado]);

  useEffect(() => {
    if (proyectoSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [proyectoSeleccionado]);

  return (
    <section className="w-full px-4 py-12">
      <h2 className="font-heading text-4xl font-bold text-center mb-10 text-text-primary">
        Mis Proyectos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {listaProyectos.map((proyecto) => (
          <div 
            key={proyecto.id}
            onClick={() => setProyectoSeleccionado(proyecto)}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden">
              <img src={`/proyectos/${proyecto.imagen}`} alt={proyecto.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-6">              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{proyecto.titulo}</h3>                            
              <p className="text-gray-600 text-sm">{proyecto.descripcionCorta}</p>          
              <div className="flex flex-wrap gap-2 mt-4">
                {proyecto.tags.slice(0, 2).map(tag => (                  
                  <span key={tag} className="font-text px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
                ))}
              </div>
            </div>  
          </div>      
        ))}
      </div>

      {mounted && proyectoSeleccionado && createPortal(
        <div 
          className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setProyectoSeleccionado(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-y-auto relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 md:h-80 shrink-0"> 
              <img src={`/proyectos/${proyectoSeleccionado.imagen}`} alt={proyectoSeleccionado.titulo} className="w-full h-full object-cover"/>
              <button 
                aria-label="Cerrar modal"
                onClick={() => setProyectoSeleccionado(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-8">              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{proyectoSeleccionado.titulo}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proyectoSeleccionado.tags.map(tag => (                  
                  <span key={tag} className="font-text px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
                            
              <div className="text-gray-600 leading-relaxed mb-8 space-y-4">
                <div>              
                  <strong className="text-gray-900">El Problema:</strong>
                  <p className="mt-1">{proyectoSeleccionado.problema}</p>
                </div>
                <div>
                  <strong className="text-gray-900">La Solución:</strong>
                  <p className="mt-1">{proyectoSeleccionado.solucion}</p>
                </div>
              </div>
              
              <a 
                href={proyectoSeleccionado.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors w-full justify-center md:w-auto"
              >  
                <span className="font-text">Ver Proyecto</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};