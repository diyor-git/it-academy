import './It.scss'
import it1 from '../../../assets/image/it1.webp'
import it2 from '../../../assets/image/it2.webp'
import {useTranslation} from "react-i18next";

const It = () => {
    const {t} = useTranslation()
    return (
        <section className='it'>
            <div className="container">
                <h2 className='title'>{t('about3')}</h2>
                <div className="card-left">
                    <img src={it1} alt="IT"/>
                    <div className="text">
                        <h2>{t('about4')}</h2>
                        <p>{t('about5')}</p>
                    </div>
                </div>
                <div className="card-right">
                    <div className="text">
                        <h2>{t('about6')}</h2>
                        <p>{t('about7')}</p>
                    </div>
                    <img src={it2} alt="IT"/>
                </div>

                <div className="skills">
                    <p>{t('about8')}</p>
                </div>
            </div>
        </section>
    )
}

export default It