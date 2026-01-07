import Header from "../components/sections/Header.jsx";
import CardSection from "../components/sections/CardSection.jsx";
import Separator from "../components/sections/Separator.jsx";
import BrandSection from "../components/sections/BrandSection.jsx";
import Footer from "../components/sections/Footer.jsx";
import {useEffect, useState} from "react";
import {cardsData} from "../data/cardsData.js";
import VideoModal from "../components/sections/ModalVideo.jsx";

export default function Home() {
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cardId = params.get('card'); // On cherche ?card=...

        if (cardId && cardsData[cardId]) {
            setActiveCard(cardsData[cardId]);
        }
    }, []);
    return (
        <>
            {activeCard && (
                <VideoModal
                    data={activeCard}
                    onClose={() => setActiveCard(null)}
                />
            )}
            <div className="bg-collab-gradient h-full">
                <Header />
                <CardSection />
                <Separator />
            </div>
            <div className="bg-neutral-900 h-full">
                <BrandSection />
                <Footer />
            </div>
        </>
    );
}