import React, { useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import NavLink from '../components/NavLink';

import SlidingButton from "../components/SlidingButton";
import FlexCard from "../components/FlexCard";
import Button from "../components/Button";


const HomePage = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => {
            observer.observe(el);
        });

        return () => {
            hiddenElements.forEach((el) => {
                observer.unobserve(el);
            });
        };
    }, []);


    return (
        <div className='homeBody'>
            <Header
                title="XP tracker"
                elements={[
                    <NavLink key="login" to='/login' text='Login' />,
                    <NavLink key="about" to='/about' text='About' />,
                ]}
            />

            <article className="hidden">
                <Card
                    title="Zbieraj doświadczenie. Rozwijaj siebie."
                    text="XP Tracker to aplikacja, która pomaga w samorozwoju, zamieniając Twoje cele w grywalną przygodę."
                    elements={[
                        // 
                    ]}
                />
                <div className="btn">
                    <Button to="#scrollStopper" text="Zaczynamy!" fontSize={"2em"}/>
                </div>

            </article>

            <main>
                <div id="scrollStopper" style={{ width: "1px" }}></div>
                <article className="hidden">
                    <FlexCard
                        title="Zmień swój rozwój w ekscytującą grę"
                        text="XP Tracker zmienia samorozwój w coś więcej niż tylko listę zadań. Dzięki systemowi poziomów i doświadczenia, możesz śledzić swoje postępy w rozwijaniu umiejętności tak, jakbyś rozwijał postać w grze RPG. Każdy cel, każdy sukces przybliża Cię do kolejnego poziomu – a im wyższy poziom, tym większe wyzwania!"
                    />
                </article>
                <article className="hidden">
                    <FlexCard
                        title="Funkcje, które wspierają Twój rozwój"
                        elements={[
                            <p>🎯 <b>Cele i Umiejętności - </b>Określ swoje cele i śledź rozwój poszczególnych umiejętności. Każdy sukces to krok bliżej do osiągnięcia kolejnego poziomu</p>,
                            <p>📊 <b>Statystyki i Postępy – </b>Analizuj swoje postępy dzięki statystykom i wykresom. Zobacz, które obszary rozwijasz najszybciej, a które wymagają większego zaangażowania.</p>,
                            <p>🏆 <b>System Nagród –</b>Zdobądź poziomy i poczuj satysfakcję z każdego osiągnięcia.</p>
                        ]}
                    />
                </article>
                <article className="hidden">
                    <FlexCard
                        title="Jak to działa?"
                        elements={[
                            <p><b>Zarejestruj się: </b> Utwórz konto i dołącz do rozwijającej społeczności.</p>,
                            <p><b>Dodaj Umiejętności:</b> Określ, nad jakimi umiejętnościami chcesz pracować – od nauki języków, przez rozwój kariery, po zdrowie.</p>,
                            <p><b>Zbieraj XP:</b> Przekazuj czas poświęcony na wykonane zadania a aplikacja przekonwertuje to na doświadczenie</p>,
                            <p><b>Analizuj postępy:</b> Monitoruj swoje statystyki i dostosuj strategie, aby efektywnie rozwijać się w wybranych obszarach</p>,
                        ]}
                    />
                </article>

            </main>
            <article className="CTA_Button">
                <SlidingButton key="register" to="/register" text="Gotów?" sliderText="Rejestracja" />
            </article>

            <Footer />
        </div>
    );
};

export default HomePage;
