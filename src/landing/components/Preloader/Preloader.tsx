import logo from '../../../assets/image/logo.svg'
import './Preloader.scss'

const Preloader = () => {
    return (
        <div className='preloader'>
            <img src={logo} alt="Logo"/>
        </div>
    )
}

export default Preloader