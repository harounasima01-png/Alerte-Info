
import React from 'react';
import { X, Github, Globe, Smartphone, ArrowRight } from 'lucide-react';

interface DeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeployGuide: React.FC<DeployGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="text-brand-red" />
            Installer sur mon téléphone
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-brand-red">1</div>
              <div>
                <h3 className="font-bold flex items-center gap-2 dark:text-white">
                  <Github size={18} /> Mettre sur GitHub
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Crée un compte GitHub, crée un "New Repository" et glisse tes fichiers dedans via le bouton "Upload files".
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-brand-red">2</div>
              <div>
                <h3 className="font-bold flex items-center gap-2 dark:text-white">
                  <Globe size={18} /> Lier à Vercel
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Connecte-toi sur Vercel.com avec GitHub. Importe ton projet. Il te donnera un lien public (URL).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-brand-red">3</div>
              <div>
                <h3 className="font-bold flex items-center gap-2 dark:text-white">
                  <Smartphone size={18} /> Installer l'APK (PWA)
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Ouvre ton lien Vercel sur ton téléphone. Clique sur <strong>"Ajouter à l'écran d'accueil"</strong> dans les options du navigateur.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-red/5 p-4 rounded-2xl border border-brand-red/10">
            <p className="text-xs text-brand-red font-medium leading-relaxed text-center">
              L'application se comportera comme une vraie application native (pas de barre d'adresse, icône sur le bureau) grâce au Service Worker inclus !
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/90 transition-all active:scale-95"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeployGuide;
