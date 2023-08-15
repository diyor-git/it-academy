import './FooterAcademy.scss'

const FooterAcademy = () => {
    let pathToFile = "/documents/";
    let downloadFile = (file:any) => {
        // eslint-disable-next-line no-restricted-globals
        location.href = pathToFile + file;
    }
    return (
        <div className='footerAcademy'>
            <div className="container">
                <div className="footer">
                    <a onClick={()=>{downloadFile('ДОГОВОР ─ ПУБЛИЧНАЯ ОФЕРТА.docx')}}>Публичная оферта</a>
                    <a target='_blank' rel='noreferrer' href="https://www.google.ru/maps/place/IT-Academy/@41.3175559,69.2837014,18.08z/data=!4m13!1m7!3m6!1s0x38ae8b2d857a5377:0x2caca2082500ac25!2zNyDRg9C70LjRhtCwINCo0LDRhdGA0LjRgdCw0LHQtywg0KLQsNGI0LrQtdC90YIgMTAwMDAw!3b1!8m2!3d41.316949!4d69.2842148!3m4!1s0x38aef5200a480655:0xeabc5e2bd1cdaae9!8m2!3d41.316587!4d69.2840593">Адрес: Узбекистан, Ташкент, ул. Шахрисабз, 7</a>
                    <a target='_blank' rel='noreferrer' href="tel:+998 99 057 52 02">+998 99 057 52 02</a>
                </div>
            </div>
        </div>
    )
}

export default FooterAcademy