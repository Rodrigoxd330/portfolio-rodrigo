import toast, { Toaster } from 'react-hot-toast';

export const BotonCopiar = ({ textoACopiar, children, className, title }) => {

  const copiarTexto = () => {
    navigator.clipboard.writeText(textoACopiar);
    toast.success('¡Copiado al portapapeles!', {        
        position: 'top-center'
      });
  };

  return (
    <button 
      onClick={copiarTexto} 
      className={className} 
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};

export const NotificacionesToast = () => {
    // client:load es necesario en Astro para que esto funcione
    return <Toaster position="bottom-center" />;
}