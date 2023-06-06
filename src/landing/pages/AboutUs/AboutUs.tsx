import './AboutUs.scss'
import Header from "../../components/Header/Header";
import It from '../../components/It/It';
import Growth from "../../components/Growth/Growth";
import Achievements from "../../components/Achievements/Achievements";
import ContactForm from "../../components/ContactForm/ContactForm";

const AboutUs = () => {
    return (
        <div className='aboutUs'>
            <section className="landingBanner">
                <Header/>
                <div className="container">
                    <div className="text">
                        <h1>Миссия Академии</h1>
                        <h2>Менять жизни людей в лучшую сторону через IT</h2>
                        <h3>
                            Ваша IT Академия была основана в Октябре 2020-го года.
                            Причина - наше желание делиться своим опытом, знаниями, связями с молодыми энтузиастами,
                            помогать вам реализовывать свои амбиции. В вас скрыт талант, который вы не видите. Мы же те,
                            кто помогает вам раскрыться.
                        </h3>
                    </div>
                </div>
            </section>
            <It/>
            <Growth/>
            <Achievements/>
            <ContactForm/>
        </div>
    )
}

export default AboutUs