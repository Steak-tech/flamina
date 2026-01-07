import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function VideoModal({ data, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Fond noir apparait
        tl.fromTo(modalRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        )
            // 2. La vidéo surgit (pop-up)
            .fromTo(contentRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
                "<0.1"
            );
    }, { scope: modalRef });

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            {/* Bouton Fermer (Zone cliquable autour) */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Contenu de la carte */}
            <div
                ref={contentRef}
                className="relative w-full max-w-3xl bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
                {/* Header Modale */}
                <div className="p-6 flex justify-between items-center bg-gradient-to-r from-tinder-pink to-tinder-orange">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Archive INA • {data.year}</span>
                        <h2 className="text-2xl font-bold text-white font-[InstrumentSerif]">{data.title}</h2>
                    </div>
                    <button onClick={onClose} className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition">
                        ✕
                    </button>
                </div>

                {/* Lecteur Vidéo (Iframe Youtube ou Video Tag) */}
                <div className="aspect-video w-full bg-black">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`${data.videoUrl}?autoplay=1`} // Autoplay important !
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Le Défi (Action ou Vérité) */}
                <div className="p-8 text-center">
                    <h3 className="text-tinder-pink font-bold uppercase tracking-widest mb-2">À vous de jouer</h3>
                    <p className="text-2xl text-white font-bold">{data.challenge}</p>
                </div>
            </div>
        </div>
    );
}