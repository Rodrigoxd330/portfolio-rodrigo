import React, { useState } from 'react';

export const GaleriaProyectos = ({ listaProyectos }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

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
            {/* Imagen de la tarjeta */}
            <div className="h-48 overflow-hidden">
              <img 
                src={proyecto.imagen} 
                alt={proyecto.titulo} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{proyecto.titulo}</h3>
              <p className="text-gray-600 text-sm">{proyecto.descripcionCorta}</p>
              
              {/* Tags pequeños */}
              <div className="flex flex-wrap gap-2 mt-4">
                {proyecto.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (Solo se muestra si hay un proyecto seleccionado) */}
      {proyectoSeleccionado && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setProyectoSeleccionado(null)} // Cierra al hacer click afuera
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro del modal
          >
            {/* Imagen Grande del Modal */}
            <div className="relative h-64">
              <img 
                src={proyectoSeleccionado.imagen} 
                alt={proyectoSeleccionado.titulo} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setProyectoSeleccionado(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-8">
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
        </div>
      )}
    </section>
  );
};